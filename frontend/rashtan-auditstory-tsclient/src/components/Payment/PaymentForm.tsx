import React, { useState, useCallback, useEffect } from "react";
import BraintreeGizmo from "./BraintreeGizmo";
import { Button, Typography } from "antd";
import IApiService from "../../services/IApiService";
import { PaymentProcessed, PricingTier } from "../../models/PricingOption";
import { showError } from "../../models/Errors";

interface Props {
  apiService: IApiService;
  tier: PricingTier;
  paymentCompleted: (r: PaymentProcessed) => void;
  back: () => void;
}

interface NonceFunc {
  func: () => Promise<string>;
}

const PaymentForm: React.FC<Props> = ({
  tier: { amount, title, length },
  apiService,
  paymentCompleted,
  back
}) => {
  const [nonceFunc, setNonceFunc] = useState<NonceFunc | null>(null);

  const pay = useCallback(
    (nonce: string) =>
      apiService
        .postPayment({ amount, nonce, length })
        .then(paymentCompleted)
        .catch(showError),
    [apiService, amount, paymentCompleted, length]
  );

  useEffect(() => {
    if (amount <= 0) {
      pay("");
    }
  }, [amount, pay]);

  return (
    <Typography>
      <Typography.Title>
        You have chosen the {title} plan that will cost you {amount}$
      </Typography.Title>
      <BraintreeGizmo
        amount={amount}
        apiService={apiService}
        onInitialized={nonce => setNonceFunc({ func: nonce })}
      />
      {nonceFunc ? (
        <React.Fragment>
          <Button type="default" onClick={back}>
            Back
          </Button>
          <Button type="primary" onClick={() => nonceFunc.func().then(pay)}>
            Buy
          </Button>
        </React.Fragment>
      ) : (
        <Typography.Title>Loading</Typography.Title>
      )}
    </Typography>
  );
};

export default PaymentForm;
