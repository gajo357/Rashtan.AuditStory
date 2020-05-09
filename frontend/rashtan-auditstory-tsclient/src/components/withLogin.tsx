import React, { ComponentType, useEffect, useState } from "react";
import { Spin } from "antd";
import { Redirect } from "react-router-dom";
import IApiService from "../services/IApiService";

interface Props {
  apiService: IApiService;
}

const withLogin = <P extends Props>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  return (props) => {
    const [loggedIn, setLoggedIn] = useState<boolean>();

    useEffect(() => {
      props.apiService.authService
        .isAuthenticated()
        .then(setLoggedIn)
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        });
    }, [props.apiService]);

    if (loggedIn === false) return <Redirect to="/login" />;
    if (loggedIn === true) return <WrappedComponent {...props} />;

    return <Spin spinning />;
  };
};

export default withLogin;
