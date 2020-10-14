import React, { ComponentType, useEffect, useState } from "react";
import { Spin } from "antd";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const withLogin = <P,>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  return props => {
    const { isAuthenticated } = useAuthContext();
    const [loggedIn, setLoggedIn] = useState<boolean>();

    useEffect(() => {
      isAuthenticated()
        .then(setLoggedIn)
        .catch(e => {
          console.log(e);
          setLoggedIn(false);
        });
    }, []);

    if (loggedIn === false) return <Redirect to="/login" />;
    if (loggedIn === true) return <WrappedComponent {...props} />;

    return <Spin spinning />;
  };
};

export default withLogin;
