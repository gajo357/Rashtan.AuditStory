import React, { ComponentType, useEffect, useState } from "react";
import { Spin, notification } from "antd";
import { Redirect } from "react-router-dom";
import IApiService from "../services/IApiService";
import { UserStatusDto, PaymentStatus } from "../models/UserInfo";
import { showError } from "../models/Errors";

interface Props {
  apiService: IApiService;
}

const withPayment = <P extends Props>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  return (props) => {
    const [status, setStatus] = useState<UserStatusDto>();

    useEffect(() => {
      props.apiService
        .getUserStatus()
        .then((s) => {
          setStatus(s);
          if (s.message)
            notification["warning"]({
              message: "User Status",
              description: s.message,
              duration: 10,
            });
        })
        .catch(showError);
    }, [props.apiService]);

    if (!status) return <Spin spinning />;

    switch (status.status) {
      case PaymentStatus.New:
        return <Redirect to="/createUser" />;
      case PaymentStatus.Paying:
        return <WrappedComponent {...props} />;
      case PaymentStatus.Expired:
        return <Redirect to="/" />;
    }
  };
};

export default withPayment;
