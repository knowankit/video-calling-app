import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Assignment,
  Phone,
  PhoneDisabled,
  VideoCall
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "src/socket-context";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  container: {
    width: "800px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%"
    }
  },
  margin: {
    marginTop: 20
  },
  padding: {
    padding: 20
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black"
  }
}));

const Sidebar = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    setVideoAvailability,
    isVideoAvailable
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Typography gutterBottom variant="h6">
              Account Info
            </Typography>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
            <CopyToClipboard text={me} className={classes.margin}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}
              >
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Typography gutterBottom variant="h6">
              Make a call
            </Typography>
            <TextField
              label="ID to call"
              value={idToCall}
              onChange={e => setIdToCall(e.target.value)}
              fullWidth
            />
            {callAccepted && !callEnded ? (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
                className={classes.margin}
              >
                Hang Up
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => callUser(idToCall)}
                className={classes.margin}
              >
                Call
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<VideoCall fontSize="large" />}
              onClick={() => setVideoAvailability(!isVideoAvailable)}
              className={classes.margin}
            ></Button>
          </Grid>
        </Grid>
      </form>
      {children}
    </Container>
  );
};

export default Sidebar;
