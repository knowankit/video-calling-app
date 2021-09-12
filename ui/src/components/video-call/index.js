import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import VideoPlayer from "src/components/video-call/video-player";
import Sidebar from "src/components/sidebar";
import Notifications from "src/components/notification";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Alert severity="warning">
        Video calling might not work if multiple people are trying to connect as
        the server is hosted on free service. You can try couple of times to
        check or better clone the repo.
      </Alert>
      <VideoPlayer />
      <Sidebar />
      <Notifications />
    </div>
  );
};

export default App;
