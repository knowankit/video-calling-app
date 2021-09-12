import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
      <VideoPlayer />
      <Sidebar />
      <Notifications />
    </div>
  );
};

export default App;
