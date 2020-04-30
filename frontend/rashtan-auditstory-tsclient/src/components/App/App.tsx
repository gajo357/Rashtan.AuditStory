import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Typography, Button, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { History } from "history";
import "./App.css";
import Terms from "../Terms";
import About from "../About";
import AccountEdit from "../AccountEdit";
import Story from "../Story/Story";
import Home from "../Home";
import CategoriesEdit from "../CategoriesEdit";
import IApiService from "../../services/IApiService";
import AuthService from "../../services/AuthService";

interface Props {
  apiService: IApiService;
  authService: AuthService;
}

const App: React.FC<Props> = ({ apiService, authService }) => {
  const goHome = (history: History) => () => history.push("/");

  const startSession = (history: History) => {
    authService
      .handleAuthentication()
      .then(goHome(history))
      .catch(authService.logIn);
    return <Spin spinning tip="Starting session..." />;
  };

  const login = (history: History) => {
    authService.isAuthenticated().then((v) => {
      if (v) goHome(history);
    });

    return (
      <div>
        <Typography.Title>AuditStory</Typography.Title>
        <Button
          icon={<LoginOutlined />}
          type="primary"
          onClick={authService.logIn}
        >
          Log In
        </Button>
      </div>
    );
  };

  return (
    <div className={"App root"}>
      <Switch>
        <Route
          path="/startSession"
          render={({ history }) => startSession(history)}
        />
        <Route exact path="/login" render={({ history }) => login(history)} />

        <Route
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

        <Route
          exact
          path="/story/:id"
          render={({ match, history }) => (
            <Story
              apiService={apiService}
              id={match.params["id"]}
              goHome={goHome(history)}
            />
          )}
        />
        <Route
          exact
          path="/account"
          render={({ history }) => (
            <AccountEdit apiService={apiService} goBack={goHome(history)} />
          )}
        />
        <Route
          exact
          path="/editCategories"
          render={({ history }) => (
            <CategoriesEdit apiService={apiService} goBack={goHome(history)} />
          )}
        />

        <Route
          exact
          path="/terms"
          render={({ history }) => <Terms goBack={goHome(history)} />}
        />

        <Route
          exact
          path="/about"
          render={({ history }) => <About goBack={goHome(history)} />}
        />

        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
