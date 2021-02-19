import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useHistory } from "react-router";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import LinkButton from "../LinkButton";
import useQueryParams from "../../hooks/useQueryParams";
import GoogleLogin from "./GoogleLogin";
import { useTitleContext } from "../../hooks/TitleProvider";

interface UserPass {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuthContext();
  const { handleError } = useNotificationContext();
  const history = useHistory();
  const { invitationCode } = useQueryParams();
  const { setTitle, resetTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Prijava");
    return resetTitle;
  }, []);

  const loginLocal = (data: UserPass) =>
    login(data.email, data.password)
      .then(() => {
        invitationCode && history.push(`/invitation?code=${invitationCode}`);
      })
      .catch(handleError);

  return (
    <>
      <Form onFinish={loginLocal} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input placeholder="Molimo unsesite adresu e-pošte" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Lozinka"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder="Molimo unesite lozinku" type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <GoogleLogin />
      <LinkButton to="forgot-password" type="link" block>
        Zaboravili ste lozinku?
      </LinkButton>

      <LinkButton
        to={invitationCode ? `register?code=${invitationCode}` : "register"}
        type="link"
        block
      >
        Nemate nalog?
      </LinkButton>
    </>
  );
};

export default Login;
