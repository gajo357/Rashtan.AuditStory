import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Pricing from "./Pricing";
import Confirmation from "./Confirmation";
import ApiService from "../../services/ApiService";
import { PricingTier, PaymentProcessed } from "../../models/PricingOption";
import { Redirect } from "react-router";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["User info", "Payment plan", "Payment", "Confirmation"];

interface Props {
  apiService: ApiService;
}

const CreateUser: React.FC<Props> = ({ apiService }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [tier, setTier] = React.useState<PricingTier | null>(null);
  const [payment, setPayment] = React.useState<PaymentProcessed | null>(null);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AddressForm
            saveUserInfo={u => {}}
            skip={() => setActiveStep(activeStep + 1)}
          />
        );
      case 1:
        return (
          <Pricing
            apiService={apiService}
            tierSelected={t => {
              setTier(t);
              setActiveStep(activeStep + 1);
            }}
          />
        );
      case 2:
        return (
          tier && (
            <PaymentForm
              tier={tier}
              apiService={apiService}
              paymentCompleted={r => {
                setPayment(r);
                setActiveStep(activeStep + 1);
              }}
              back={() => setActiveStep(activeStep - 1)}
              buttonClass={classes.button}
            />
          )
        );

      case 3:
        return (
          <React.Fragment>
            {payment && (
              <Confirmation
                payment={payment}
                nextStep={() => setActiveStep(activeStep + 1)}
                buttonClass={classes.button}
              />
            )}
          </React.Fragment>
        );
      default:
        return <Redirect to="/portal" />;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <Redirect to="/portal" />
            ) : (
              <React.Fragment>{getStepContent()}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default CreateUser;
