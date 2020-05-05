import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { Typography, Button, Spin, notification } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { History } from "history";
import "./App.css";
import Terms from "../Terms";
import AccountEdit from "../AccountEdit";
import Story from "../Story/Story";
import Home from "../Home";
import CategoriesEdit from "../CategoriesEdit";
import Confirmation from "../Confirmation";
import IApiService from "../../services/IApiService";
import AuthService from "../../services/AuthService";
import { UserStatusDto, PaymentStatus } from "../../models/UserInfo";
import useInterval from "../../models/useInterval";
import { showError } from "../../models/Errors";
import CreateUser from "../CreateUser";

interface Props {
  apiService: IApiService;
  authService: AuthService;
}

const App: React.FC<Props> = ({ apiService, authService }) => {
  const [status, setStatus] = useState<UserStatusDto>();

  const getUserStatus = () => {
    authService
      .isAuthenticated()
      .then((v) => {
        if (v)
          apiService
            .getUserStatus()
            .then((s) => {
              if (status?.status !== s.status) {
                setStatus(s);
                if (s.message)
                  notification["warning"]({
                    message: "User Status",
                    description: s.message,
                    duration: 10,
                  });
              }
            })
            .catch(showError);
      })
      .catch(showError);
  };

  useEffect(getUserStatus, [apiService]);
  useInterval(getUserStatus, 5000);

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

  const CreateUserRoute: React.FC<RouteProps> = (props) => {
    if (status?.status === PaymentStatus.New) return <Route {...props} />;

    return <Redirect to="/" />;
  };

  const PayedRoute: React.FC<RouteProps> = (props) => {
    if (!status || status?.status === PaymentStatus.Paying) {
      return <Route {...props} />;
    }

    if (status.status === PaymentStatus.New) {
      return <Redirect to="/createUser" />;
    }

    return <Redirect to="/" />;
  };

  return (
    <div className={"App root"}>
      <Switch>
        <Route
          path="/startSession"
          render={({ history }) => startSession(history)}
        />
        <Route exact path="/login" render={({ history }) => login(history)} />

        <PayedRoute
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
        <PayedRoute
          exact
          path="/account"
          render={({ history }) => (
            <AccountEdit apiService={apiService} goBack={goHome(history)} />
          )}
        />
        <PayedRoute
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

        <CreateUserRoute
          exact
          path="/createUser"
          render={({ history }) => (
            <CreateUser apiService={apiService} goBack={goHome(history)} />
          )}
        />

        <Route
          path="/confirmation"
          render={({ history }) => (
            <Confirmation apiService={apiService} goHome={goHome(history)} />
          )}
        />

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

        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
