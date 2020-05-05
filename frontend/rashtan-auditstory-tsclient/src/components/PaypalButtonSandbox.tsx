import React from "react";

interface Props {
  buttonId: string;
}
const PaypalButtonSandbox: React.FC<Props> = ({ buttonId }) => (
  <form
    action="https://www.sandbox.paypal.com/cgi-bin/webscr"
    method="post"
    target="_top"
  >
    <input type="hidden" name="cmd" value="_s-xclick" />
    <input type="hidden" name="hosted_button_id" value={buttonId} />
    <input
      type="image"
      src="https://www.sandbox.paypal.com/en_US/DK/i/btn/btn_subscribeCC_LG.gif"
      name="submit"
      alt="PayPal - The safer, easier way to pay online!"
    />
    <img
      alt=""
      src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif"
      width="1"
      height="1"
    />
  </form>
);

export default PaypalButtonSandbox;
