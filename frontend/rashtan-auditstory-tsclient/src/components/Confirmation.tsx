import React, { useState } from "react";
import { Button, Typography, Progress } from "antd";
import { PaymentStatus } from "../models/UserInfo";
import { showError } from "../models/Errors";
import useInterval from "../models/useInterval";
import { useApiService } from "../hooks/ApiProvider";
import useNavigation from "../hooks/useNavigation";

const Confirmation: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const { getUserStatus } = useApiService();
  const { goHome } = useNavigation();

  const duration = 60;

  useInterval(() => {
    getUserStatus()
      .then(s => {
        if (s.status === PaymentStatus.Paying) setEnabled(true);
      })
      .catch(showError);
  }, 5000);

  useInterval(() => {
    if (count < duration) {
      if (enabled) setCount(duration);
      else setCount(c => c + 1);
    } else setCount(0);
  }, 1000);

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <Typography.Title>Congrats! Thank you for your order.</Typography.Title>
      <Typography.Paragraph>
        Please wait until we get the payment confirmation from PayPal (this may
        take up to 1 minute).
      </Typography.Paragraph>
      <Progress
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068"
        }}
        percent={(count * 100) / duration}
        showInfo={false}
      />
      <Button onClick={goHome} type="primary" loading={!enabled}>
        Happy investing!
      </Button>
    </div>
  );
};

export default Confirmation;
