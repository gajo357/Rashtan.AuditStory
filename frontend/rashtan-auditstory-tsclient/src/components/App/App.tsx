import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";
import Terms from "../Terms";
import AccountEdit from "../AccountEdit";
import Story from "../Story/Story";
import Home from "../Home";
import CategoriesEdit from "../CategoriesEdit";
import Confirmation from "../Confirmation";
import CreateUser from "../CreateUser";
import { useAuthContext } from "../../hooks/AuthProvider";
import VerifyEmail from "../Auth/VerifyEmail";
import Login from "../Auth/Login";
import NonAuthRoute from "../Navigation/NonAuthRoute";
import AuthRoute from "../Navigation/AuthRoute";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";

const App: React.FC = () => {
  const { loadingAuthState, user } = useAuthContext();

  if (loadingAuthState) return <Spin tip="Logging you in, please wait..." />;
  if (user && !user.emailVerified) return <VerifyEmail />;

  return (
    <div className={"App root"}>
      <Switch>
        <NonAuthRoute path="/login" component={Login} exact />
        <NonAuthRoute path="/register" component={Register} />
        <NonAuthRoute path="/forgot-password" component={ForgotPassword} />

        <AuthRoute
          exact
          path="/story/:id"
          render={({ match }) => <Story id={match.params["id"]} />}
        />
        <AuthRoute exact path="/account" component={AccountEdit} />
        <AuthRoute exact path="/editCategories" component={CategoriesEdit} />

        <Route exact path="/terms" component={Terms} />

        <AuthRoute exact path="/createUser" component={CreateUser} />

        <AuthRoute path="/confirmation" component={Confirmation} />

        <AuthRoute exact path="/" component={Home} />

        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
