import React from "react";
import ReactDOM from "react-dom";
import IApiService from "../../services/IApiService";
import { UserError, showError } from "../../models/Errors";

const BraintreeWebDropIn = require("braintree-web-drop-in");

interface Props {
  apiService: IApiService;
  amount: number;
  onInitialized: (buy: () => Promise<string>) => void;
}

class BraintreeGizmo extends React.Component<Props> {
  private wrapper: any;
  private instance: any;

  componentDidMount() {
    // Get a client token for authorization from your server
    this.props.apiService
      .getPaymentToken()
      .then(async clientToken => {
        this.instance = await BraintreeWebDropIn.create({
          container: ReactDOM.findDOMNode(this.wrapper),
          ...{
            authorization: clientToken,
            paypal: {
              flow: "checkout",
              amount: this.props.amount.toString(),
              currency: "USD",
              intent: "capture"
            },
            paypalCredit: {
              flow: "checkout",
              amount: this.props.amount.toString(),
              currency: "USD"
            },
            card: {}
          }
        });
        this.props.onInitialized(this.buy);
      })
      .catch(showError);
  }

  async componentWillUnmount() {
    if (this.instance) {
      await this.instance.teardown();
    }
  }

  shouldComponentUpdate() {
    // Static
    return false;
  }

  buy = async () => {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();
    return nonce;
  };

  render() {
    return <div ref={ref => (this.wrapper = ref)} />;
  }
}

export default BraintreeGizmo;
