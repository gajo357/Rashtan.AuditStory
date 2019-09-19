import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { History } from "history";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Home from "../Home";
import Header from "../Header";
import Footer from "../Footer";
import About from "../About";
import Contact from "../Contact";
import PortalDashboard from "../PortalDashboard/PortalDashboard";
import Terms from "../Terms";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import CreateUser from "../CreateUser";
import { UserStatus } from "../../models/IUserProfile";
import PortalNewStory from "../PortalNewStory";
import PortalStory from "../PortalStory";
import PortalFolders from "../PortalFolders";
import PortalLayout from "../PortalLayout";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));

interface Props {
  apiService: ApiService;
  authService: AuthService;
}

const App: React.FC<Props> = ({ apiService, authService }) => {
  const { appBar, root } = useStyles();
  const [isAuthenticated, setAuthenticated] = useState(
    authService.isAuthenticated()
  );

  const sessionStarted = (history: History) => () => {
    apiService
      .getUserStatus()
      .then(r => {
        switch (r) {
          case UserStatus.New: {
            history.push("/createUser");
            break;
          }
          default: {
            history.push("/portal");
            break;
          }
        }
      })
      .catch(error => console.log(error));

    setAuthenticated(authService.isAuthenticated());
  };

  const startSession = (history: History) => {
    authService.handleAuthentication(sessionStarted(history));
    return (
      <div>
        <p>Starting session...</p>
      </div>
    );
  };

  const logOut = () => {
    authService.logOut();
    setAuthenticated(false);
  };

  const header = () => (
    <Header
      loggedIn={isAuthenticated}
      logIn={authService.logIn}
      logOut={logOut}
    />
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(root, appBar)}>
        <Switch>
          <Route
            path="/startSession"
            render={({ history }) => startSession(history)}
          />

          <Route exact path="/">
            {header()}
            <Home />
          </Route>
          <Route exact path="/about">
            {header()}
            <About />
          </Route>
          <Route exact path="/contact">
            {header()}
            <Contact />
          </Route>
          <Route exact path="/terms">
            {header()}
            <Terms />
          </Route>
          <Route
            exact
            path="/createUser"
            render={({ history }) => (
              <>
                {header()}
                <CreateUser apiService={apiService} history={history} />
              </>
            )}
          />

          <PortalLayout apiService={apiService} logOut={logOut}>
            <Route
              exact
              path="/portal"
              render={({ history }) => (
                <PortalDashboard apiService={apiService} history={history} />
              )}
            />
            <Route
              exact
              path="/portal/newstory"
              render={({ history }) => (
                <PortalNewStory apiService={apiService} history={history} />
              )}
            />
            <Route
              exact
              path="/portal/story/:ticker"
              render={({ match }) => (
                <PortalStory
                  apiService={apiService}
                  ticker={match.params["ticker"]}
                />
              )}
            />
            <Route
              exact
              path="/portal/folder/:name"
              render={({ history, match }) => (
                <PortalFolders
                  apiService={apiService}
                  history={history}
                  folder={match.params["name"]}
                />
              )}
            />
          </PortalLayout>

          <Route component={() => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </AppBar>
    </React.Fragment>
  );
};

export default App;
