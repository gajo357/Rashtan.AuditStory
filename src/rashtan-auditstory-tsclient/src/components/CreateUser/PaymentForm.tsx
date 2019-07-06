import React, { useState, useCallback, useEffect } from "react";
import BraintreeGizmo from "./BraintreeGizmo";
import { Button, Typography } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import { PaymentProcessed } from "../../models/PricingOption";

interface Props {
  apiService: ApiService;
  amount: number;
  paymentCompleted: (r: PaymentProcessed) => void;
}

interface BuyFunc {
  func: () => Promise<string>;
}

const PaymentForm: React.FC<Props> = ({
  amount,
  apiService,
  paymentCompleted
}) => {
  const [buyFunc, setBuyFunc] = useState<BuyFunc | null>(null);

  const pay = useCallback(
    (nonce: string) =>
      apiService
        .postPayment({ amount, nonce })
        .then(r => paymentCompleted(r))
        .catch(e => alert(e)),
    [apiService, amount, paymentCompleted]
  );

  useEffect(() => {
    if (amount <= 0) {
      pay("");
    }
  }, [amount, pay]);

  return amount > 0 ? (
    <React.Fragment>
      <BraintreeGizmo
        amount={amount}
        apiService={apiService}
        onInitialized={b => setBuyFunc({ func: b })}
      />
      {buyFunc ? (
        <Button onClick={() => buyFunc.func().then(pay)}>Buy</Button>
      ) : (
        <Typography variant="h5">Loading</Typography>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Typography variant="h5">Starting free trial</Typography>
    </React.Fragment>
  );
};

export default PaymentForm;
