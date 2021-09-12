import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const CONNECTION_LINK =
  process.env.NODE_ENV === "production"
    ? "https://video-chat-app-github.herokuapp.com/"
    : "http://localhost:5000";
const socket = io(CONNECTION_LINK);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [isAudioAvailable, setAudioAvailability] = useState(true);
  const [isVideoAvailable, setVideoAvailability] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    setStream(null);

    if (isVideoAvailable || isAudioAvailable) {
      navigator.mediaDevices
        .getUserMedia({ video: isVideoAvailable, audio: isAudioAvailable })
        .then(currentStream => {
          setStream(currentStream);

          if (isVideoAvailable) myVideo.current.srcObject = currentStream;
        });
    }

    if (!isVideoAvailable) {
      stream?.getVideoTracks()[0].stop();
    }
  }, [isVideoAvailable, isAudioAvailable]);

  useEffect(() => {
    socket.on("me", id => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", data => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = id => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", data => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name
      });
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", signal => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        isAudioAvailable,
        isVideoAvailable,
        setAudioAvailability,
        setVideoAvailability,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
