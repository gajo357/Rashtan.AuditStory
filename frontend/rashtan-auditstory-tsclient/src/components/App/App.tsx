import React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { Typography, Button, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { History } from "history";
import "./App.css";
import Footer from "../Footer";
import Terms from "../Terms";
import AccountEdit from "../AccountEdit";
import Story from "../Story/Story";
import Home from "../Home";
import CategoriesEdit from "../CategoriesEdit";
import IApiService from "../../services/IApiService";
import AuthService from "../../services/AuthService";
import { showError } from "../../models/Errors";

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
    return <Spin spinning tip="Starting session..." />;
  };

  const AuthenticatedRoute = (props: RouteProps) => {
    if (authService.isAuthenticated()) {
      return <Route {...props} />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <div className={"App root"}>
      <Switch>
        <Route
          path="/startSession"
          render={({ history }) => startSession(history)}
        />
        <Route exact path="/login">
          <div>
            <Typography.Title>AuditStory</Typography.Title>
            <Button
              icon={<LoginOutlined />}
              type="primary"
              onClick={() => authService.logIn()}
            >
              Log In
            </Button>
          </div>
        </Route>

        <AuthenticatedRoute exact path="/terms">
          <Terms />
          <Footer />
        </AuthenticatedRoute>

        <AuthenticatedRoute
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

        <AuthenticatedRoute
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
        <AuthenticatedRoute
          exact
          path="/account"
          render={({ history }) => (
            <AccountEdit
              apiService={apiService}
              goBack={() => history.push("/")}
            />
          )}
        />
        <AuthenticatedRoute
          exact
          path="/editCategories"
          render={({ history }) => (
            <CategoriesEdit
              apiService={apiService}
              goBack={() => history.push("/")}
            />
          )}
        />
        <AuthenticatedRoute component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
