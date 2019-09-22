import React from "react";
import { Button, Typography } from "antd";
import { PaymentProcessed } from "../../models/PricingOption";

interface Props {
  payment: PaymentProcessed;
  nextStep: () => void;
}

const Confirmation: React.FC<Props> = ({
  nextStep,
  payment: { transactionId, payedUntil }
}) => {
  return (
    <React.Fragment>
      <Typography.Title>Congrats! Thank you for your order.</Typography.Title>
      <Typography.Paragraph>
        Your order number is {transactionId}. Your subscription expires{" "}
        {payedUntil.toLocaleDateString()}. We have emailed your order
        confirmation. Happy investing!
      </Typography.Paragraph>
      <Button onClick={() => nextStep()} type="default">
        Finish
      </Button>
    </React.Fragment>
  );
};

export default Confirmation;
