import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useTitleContext } from "../../hooks/TitleProvider";
import LinkButton from "../LinkButton";

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuthContext();
  const { setTitle, resetTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Zaboravljena lozinka");
    return resetTitle;
  }, []);

  const sendResetPasswordEmail = (e: { email: string }) =>
    forgotPassword(e.email)
      .then(() => {
        alert("Email is sent");
      })
      .catch((error: any) => {
        alert(error.message);
      });

  return (
    <>
      <Form onFinish={sendResetPasswordEmail} layout="vertical">
        <Form.Item
          name={"email"}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input placeholder="Molimo unsesite adresu e-pošte" type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Pošalji reset lozinke
          </Button>
        </Form.Item>
      </Form>

      <LinkButton type="link" to="/login" block>
        Idi na Login stranicu
      </LinkButton>
    </>
  );
};

export default ForgotPassword;
