import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2),
    height: "inherit",
    backgroundImage: 'url("video-call.jpg")',
    backgroundSize: "cover",
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10%"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mobileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  button: {
    textTransform: "none",
    marginTop: "20px",
    fontWeight: "bold"
  }
}));

const LoginScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item sm={6} className={classes.mobileContainer}>
          <Box
            display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
            width="70%"
          >
            <Container maxWidth="sm">
              <img src="video-call.jpg" className={classes.image} />
            </Container>
          </Box>
          <Typography variant="h4" align="center">
            Welcome to video calling app.
          </Typography>
          <Button
            variant="outlined"
            className={classes.button}
            color="secondary"
            onClick={() => {
              window.location.href = `${window.location.origin}/call`;
            }}
          >
            JOIN
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Box display={{ xs: "none", sm: "none", md: "block", lg: "block" }}>
            <Container maxWidth="sm">
              <img src="video-call.jpg" className={classes.image} />
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginScreen;
