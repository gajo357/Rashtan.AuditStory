import React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { History } from "history";
import "./App.css";
import Footer from "../Footer";
import Terms from "../Terms";
import IApiService from "../../services/IApiService";
import AuthService from "../../services/AuthService";
import EditUser from "../EditUser";
import Story from "../Story/Story";
import Home from "../Home";
import { showError } from "../../models/Errors";
import { Typography, Button } from "antd";

interface Props {
  apiService: IApiService;
  authService: AuthService;
}

const App: React.FC<Props> = ({ apiService, authService }) => {
  const sessionStarted = (history: History) => () => {
    history.push("/");
  };

  const startSession = (history: History) => {
    authService
      .handleAuthentication()
      .then(sessionStarted(history))
      .catch(showError);
    return (
      <div>
        <p>Starting session...</p>
      </div>
    );
  };

  const CustomRoute = (props: RouteProps) => {
    if (authService.isAuthenticated()) {
      return <Route {...props} />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <div className={"app root"}>
      <Switch>
        <Route
          path="/startSession"
          render={({ history }) => startSession(history)}
        />
        <Route exact path="/login">
          <div>
            <Typography.Title>AuditStory</Typography.Title>
            <Button
              icon="login"
              type="primary"
              onClick={() => authService.logIn()}
            >
              Log In
            </Button>
          </div>
        </Route>

        <CustomRoute exact path="/terms">
          <Terms />
          <Footer />
        </CustomRoute>

        <CustomRoute
          exact
          path="/"
          render={({ history }) => (
            <Home
              apiService={apiService}
              history={history}
              logOut={authService.logOut}
            />
          )}
        />

        <CustomRoute
          exact
          path="/story/:id"
          render={({ match, history }) => (
            <Story
              apiService={apiService}
              id={match.params["id"]}
              goHome={() => history.push("/")}
            />
          )}
        />
        <CustomRoute
          exact
          path="/account"
          component={() => <EditUser apiService={apiService} />}
        />
        <CustomRoute component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
