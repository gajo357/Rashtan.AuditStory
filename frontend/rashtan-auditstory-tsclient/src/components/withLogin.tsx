import React, { ComponentType } from "react";
import { Spin } from "antd";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthProvider";

const withLogin = <P,>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  return props => {
    const { authenticated, loadingAuthState } = useAuthContext();

    if (loadingAuthState) return <Spin spinning />;

    return authenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };
};

export default withLogin;
