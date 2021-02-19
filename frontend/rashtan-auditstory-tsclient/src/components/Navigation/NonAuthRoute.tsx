import React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { useAuthContext } from "../../hooks/AuthProvider";

interface Props extends RouteProps {
  component: React.ComponentType;
}

const NonAuthRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={_ => (authenticated ? <Redirect to="" /> : <Component />)}
    ></Route>
  );
};

export default NonAuthRoute;
