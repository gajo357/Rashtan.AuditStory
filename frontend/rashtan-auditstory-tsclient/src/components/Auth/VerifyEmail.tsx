import React, { useEffect } from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import useQueryParams from "../../hooks/useQueryParams";
import { useTitleContext } from "../../hooks/TitleProvider";

const VerifyEmail: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { showToast } = useNotificationContext();
  const { invitationCode } = useQueryParams();
  const { setTitle, resetTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Potvrda e-pošte");
    return resetTitle;
  }, []);

  return (
    <>
      <h3>
        Morate potvrditi adresu Vaše e-pošte {user?.email}. Molimo proverite
        Vašu e-poštu i pritisnite dugme za potvrdu! Морате потврдити адресу Ваше
        е-поште {{ user }}. Молимо преверите вашу е-пошту и притисните дугме за
        потврду!
      </h3>
      <Button
        block
        htmlType="submit"
        onClick={() =>
          user
            ?.sendEmailVerification(invitationCode)
            .then(() => showToast({ message: "Poslata poruka za potvrdu!" }))
        }
      >
        Ponovo pošalji poruku za potvrdu
      </Button>
      <Button block type="default" onClick={logout} icon={<LogoutOutlined />}>
        Odjavi se
      </Button>
    </>
  );
};

export default VerifyEmail;
