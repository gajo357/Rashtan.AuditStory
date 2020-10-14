import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Typography, Button, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { History } from "history";
import "./App.css";
import Terms from "../Terms";
import AccountEdit from "../AccountEdit";
import Story from "../Story/Story";
import Home from "../Home";
import CategoriesEdit from "../CategoriesEdit";
import Confirmation from "../Confirmation";
import CreateUser from "../CreateUser";
import { useAuthContext } from "../../context/AuthProvider";

const App: React.FC = () => {
  const { logIn, handleAuthentication, isAuthenticated } = useAuthContext();

  const goHome = (history: History) => () => history.push("/");

  const startSession = (history: History) => {
    handleAuthentication().then(goHome(history)).catch(logIn);
    return <Spin spinning tip="Starting session..." />;
  };

  const login = (history: History) => {
    isAuthenticated().then(v => {
      if (v) goHome(history);
    });

    return (
      <div>
        <Typography.Title>AuditStory</Typography.Title>
        <Button icon={<LoginOutlined />} type="primary" onClick={logIn}>
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
          path="/story/:id"
          render={({ match, history }) => (
            <Story id={match.params["id"]} goHome={goHome(history)} />
          )}
        />
        <Route
          exact
          path="/account"
          render={({ history }) => <AccountEdit goBack={goHome(history)} />}
        />
        <Route
          exact
          path="/editCategories"
          render={({ history }) => <CategoriesEdit goBack={goHome(history)} />}
        />

        <Route
          exact
          path="/terms"
          render={({ history }) => <Terms goBack={goHome(history)} />}
        />

        <Route
          exact
          path="/createUser"
          render={({ history }) => <CreateUser goBack={goHome(history)} />}
        />

        <Route
          path="/confirmation"
          render={({ history }) => <Confirmation goHome={goHome(history)} />}
        />

        <Route
          exact
          path="/"
          render={({ history }) => <Home history={history} />}
        />

        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
