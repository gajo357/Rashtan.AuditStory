import React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { useAuthContext } from "../../hooks/AuthProvider";

const AuthRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { authenticated } = useAuthContext();
  return authenticated ? (
    <Route {...rest}></Route>
  ) : (
    <Route>
      <Redirect to="/login" />
    </Route>
  );
};

export default AuthRoute;
