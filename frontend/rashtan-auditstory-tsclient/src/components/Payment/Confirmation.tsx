import React from "react";
import { Button, Typography } from "@material-ui/core";
import { PaymentProcessed } from "../../models/PricingOption";

interface Props {
  payment: PaymentProcessed;
  nextStep: () => void;
  buttonClass: string;
}

const Confirmation: React.FC<Props> = ({
  nextStep,
  buttonClass,
  payment: { transactionId, payedUntil }
}) => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Congrats! Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is {transactionId}. Your subscription expires{" "}
        {payedUntil.toLocaleDateString()}. We have emailed your order
        confirmation. Happy investing!
      </Typography>
      <Button onClick={() => nextStep()} className={buttonClass}>
        Finish
      </Button>
    </React.Fragment>
  );
};

export default Confirmation;
