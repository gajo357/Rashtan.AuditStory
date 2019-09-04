import React, { useState, useCallback, useEffect } from "react";
import BraintreeGizmo from "./BraintreeGizmo";
import { Button, Typography } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import { PaymentProcessed, PricingTier } from "../../models/PricingOption";

interface Props {
  apiService: ApiService;
  tier: PricingTier;
  paymentCompleted: (r: PaymentProcessed) => void;
  back: () => void;
  buttonClass: string;
}

interface BuyFunc {
  func: () => Promise<string>;
}

const PaymentForm: React.FC<Props> = ({
  tier: { amount, title, length },
  apiService,
  paymentCompleted,
  back,
  buttonClass
}) => {
  const [buyFunc, setBuyFunc] = useState<BuyFunc | null>(null);

  const pay = useCallback(
    (nonce: string) =>
      apiService
        .postPayment({ amount, nonce, length })
        .then(r => paymentCompleted(r))
        .catch(e => alert(e)),
    [apiService, amount, paymentCompleted, length]
  );

  useEffect(() => {
    if (amount <= 0) {
      pay("");
    }
  }, [amount, pay]);

  return amount > 0 ? (
    <React.Fragment>
      <Typography variant="h5">
        You have chosen the {title} plan that will cost you {amount}$
      </Typography>
      <BraintreeGizmo
        amount={amount}
        apiService={apiService}
        onInitialized={b => setBuyFunc({ func: b })}
      />
      {buyFunc ? (
        <React.Fragment>
          <Button variant="outlined" onClick={back} className={buttonClass}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => buyFunc.func().then(pay)}
            className={buttonClass}
          >
            Buy
          </Button>
        </React.Fragment>
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
