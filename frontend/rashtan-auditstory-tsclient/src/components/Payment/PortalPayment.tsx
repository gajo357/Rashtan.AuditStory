import React from "react";
import { History } from "history";
import { Typography, Steps } from "antd";
import PaymentForm from "./PaymentForm";
import Pricing from "./Pricing";
import Confirmation from "./Confirmation";
import ApiService from "../../services/ApiService";
import { PricingTier, PaymentProcessed } from "../../models/PricingOption";

const { Step } = Steps;

interface Props {
  apiService: ApiService;
  history: History;
}

const PortalPayment: React.FC<Props> = ({ apiService, history }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [tier, setTier] = React.useState<PricingTier | null>(null);
  const [payment, setPayment] = React.useState<PaymentProcessed | null>(null);

  const next = () => {
    setActiveStep(activeStep + 1);
  };

  const back = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Typography.Title>Checkout</Typography.Title>

      <Steps current={activeStep}>
        <Step title="Payment plan">
          <Pricing
            apiService={apiService}
            tierSelected={t => {
              setTier(t);
              next();
            }}
          />
        </Step>
        <Step title="Payment">
          {tier && (
            <PaymentForm
              tier={tier}
              apiService={apiService}
              paymentCompleted={r => {
                setPayment(r);
                next();
              }}
              back={back}
            />
          )}
        </Step>
        <Step>
          <React.Fragment>
            {payment && (
              <Confirmation
                payment={payment}
                nextStep={() => history.push("/")}
              />
            )}
          </React.Fragment>
        </Step>
      </Steps>
    </React.Fragment>
  );
};

export default PortalPayment;
