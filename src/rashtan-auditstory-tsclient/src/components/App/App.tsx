import React from "react";
import { Switch, Route } from "react-router-dom";
import { History } from "history";
import "./App.css";
import ApiService from "../../services/ApiService";
import Home from "../Home/Home";
import Header from "../Header/Header";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Portal from "../Portal/Portal";

const apiService = new ApiService();
const authService = apiService.authService;

const startSession = (history: History) => {
  authService.handleAuthentication(history);
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
          <Home apiService={apiService} />
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
      </Switch>
    </div>
  );
};

export default App;
