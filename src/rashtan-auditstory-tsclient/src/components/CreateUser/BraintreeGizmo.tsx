import React from "react";
import ReactDOM from "react-dom";
import ApiService from "../../services/ApiService";

const BraintreeWebDropIn = require("braintree-web-drop-in");

interface Props {
  apiService: ApiService;
  amount: number;
  onInitialized: (buy: () => Promise<string>) => void;
}

class BraintreeGizmo extends React.Component<Props> {
  private wrapper: any;
  private instance: any;

  async componentDidMount() {
    // Get a client token for authorization from your server
    const clientToken = await this.props.apiService.getPaymentToken();

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
