import React, { useContext } from "react";

import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import { SocketContext } from "src/socket-context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  const showNotification = call.isReceivingCall && !callAccepted;
  return (
    <>
      {showNotification && (
        <Snackbar
          open={showNotification}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="info">
            <Typography variant="h5" align="center">
              {call.name} is calling
            </Typography>
            <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button>
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notifications;
