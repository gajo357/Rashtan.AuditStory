import React from "react";
import { Button } from "antd";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useHistory } from "react-router";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import useQueryParams from "../../hooks/useQueryParams";
import GoogleIcon from "../../assets/GoogleIcon";

const GoogleLogin: React.FC = () => {
  const { googleLogin } = useAuthContext();
  const { handleError } = useNotificationContext();
  const history = useHistory();
  const { invitationCode } = useQueryParams();

  const googleLoginLocal = () => {
    googleLogin()
      .then(
        () =>
          invitationCode && history.push(`/invitation?code=${invitationCode}`)
      )
      .catch(handleError);
  };

  return (
    <Button
      block
      className="google-login"
      htmlType="submit"
      onClick={googleLoginLocal}
      icon={<GoogleIcon />}
    >
      Google login
    </Button>
  );
};

export default GoogleLogin;
