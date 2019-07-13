import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { History } from "history";
import AppBar from "@material-ui/core/AppBar";
import "./App.css";
import ApiService from "../../services/ApiService";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Portal from "../Portal/Portal";
import Terms from "../Terms/Terms";
import AuthService from "../../services/AuthService";
import CreateUser from "../CreateUser/CreateUser";
import { UserStatus } from "../../models/IUserProfile";

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
      .getUserProfile()
      .then(r => {
        switch (r.status) {
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
    authService.logout();
    setAuthenticated(false);
  };

  return (
    <div className={root}>
      <AppBar position="absolute" className={appBar}>
        <Header
          loggedIn={isAuthenticated}
          logIn={authService.login}
          logOut={logOut}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/startSession"
            render={({ history }) => startSession(history)}
          />
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/portal">
            <Portal apiService={apiService} />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>
          <Route exact path="/createUser">
            <CreateUser apiService={apiService} />
          </Route>
        </Switch>
        <Footer />
      </AppBar>
    </div>
  );
};

export default App;
