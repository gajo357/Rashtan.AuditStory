import React, { FC, Fragment, useState } from "react";
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
  func: () => Promise<PaymentProcessed>;
}

const PaymentForm: FC<Props> = ({ amount, apiService, paymentCompleted }) => {
  const [buyFunc, setBuyFunc] = useState<BuyFunc | null>(null);

  return (
    <Fragment>
      <BraintreeGizmo
        amount={amount}
        apiService={apiService}
        onInitialized={b => setBuyFunc({ func: b })}
      />
      {buyFunc ? (
        <Button
          onClick={() =>
            buyFunc
              .func()
              .then(r => paymentCompleted(r))
              .catch(e => alert(e))
          }
        >
          Buy
        </Button>
      ) : (
        <Typography variant="h5">Loading</Typography>
      )}
    </Fragment>
  );
};

export default PaymentForm;
