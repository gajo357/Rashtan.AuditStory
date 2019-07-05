import React from "react";
import { Switch, Route } from "react-router-dom";
import { History } from "history";
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

const authService = new AuthService();
const apiService = new ApiService(authService);

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
};

const startSession = (history: History) => {
  authService.handleAuthentication(sessionStarted(history));
  return (
    <div>
      <p>Starting session...</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Header
        loggedIn={authService.isAuthenticated()}
        logIn={authService.login}
        logOut={authService.logout}
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
    </div>
  );
};

export default App;
