import React from "react";
import VideoCall from "src/components/video-call";
import LoginScreen from "src/components/login-screen";
import { ContextProvider } from "src/socket-context";
import Navigation from "src/components/navigation";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div>
        <Switch>
          <Route path="/" exact>
            <LoginScreen />
          </Route>
          <Route path="/call">
            <ContextProvider>
              <VideoCall />
            </ContextProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
