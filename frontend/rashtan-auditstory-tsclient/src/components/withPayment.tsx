import React, { ComponentType, useEffect, useState } from "react";
import { Spin, notification } from "antd";
import { Redirect } from "react-router-dom";
import { UserStatusDto, PaymentStatus } from "../models/UserInfo";
import { showError } from "../models/Errors";
import { useApiService } from "../hooks/ApiProvider";

const withPayment = <P,>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  return props => {
    const { getUserStatus } = useApiService();
    const [status, setStatus] = useState<UserStatusDto>();

    useEffect(() => {
      getUserStatus()
        .then(s => {
          setStatus(s);
          if (s.message)
            notification["warning"]({
              message: "User Status",
              description: s.message,
              duration: 10
            });
        })
        .catch(showError);
    }, []);

    if (!status) return <Spin spinning />;

    switch (status.status) {
      case PaymentStatus.New:
        return <Redirect to="/createUser" />;
      case PaymentStatus.Expired:
        return <Redirect to="/" />;
      default:
        return <WrappedComponent {...props} />;
    }
  };
};

export default withPayment;
