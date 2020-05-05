import React, { useState } from "react";
import { Button, Typography, Progress } from "antd";
import IApiService from "../services/IApiService";
import { PaymentStatus } from "../models/UserInfo";
import { showError } from "../models/Errors";
import useInterval from "../models/useInterval";

interface Props {
  apiService: IApiService;
  goHome: () => void;
}

const Confirmation: React.FC<Props> = ({ apiService, goHome }) => {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(0);

  const duration = 60;

  useInterval(() => {
    apiService
      .getUserStatus()
      .then((s) => {
        if (s.status === PaymentStatus.Paying) setEnabled(true);
      })
      .catch(showError);
  }, 5000);

  useInterval(() => {
    if (count < duration) {
      if (enabled) setCount(duration);
      else setCount((c) => c + 1);
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
          "100%": "#87d068",
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
