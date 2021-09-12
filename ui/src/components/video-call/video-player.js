import React, { useContext } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { SocketContext } from "src/socket-context";

const useStyles = makeStyles(theme => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px"
    }
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px"
  },
  video: {
    transform: "scaleX(-1)",
    borderRadius: "10%"
  },
  blackScreen: {
    backgroundColor: "black",
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px"
    }
  }
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream ? (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {name || "Name"}
          </Typography>
          <video
            className={classes.video}
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      ) : (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {name || "Name Ankit"}
          </Typography>
          <Box className={classes.blackScreen}></Box>
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {call.name || "Name"}
          </Typography>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
