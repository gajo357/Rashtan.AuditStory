import React from "react";

interface Props {
  buttonId: string;
}
const PaypalButton: React.FC<Props> = ({ buttonId }) => (
  <form
    style={{ margin: 20 }}
    action="https://www.paypal.com/cgi-bin/webscr"
    method="post"
    target="_top"
  >
    <input type="hidden" name="cmd" value="_s-xclick" />
    <input type="hidden" name="hosted_button_id" value={buttonId} />
    <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif"
      name="submit"
      alt="PayPal - The safer, easier way to pay online!"
      style={{ border: 0 }}
    />
    <img
      alt=""
      src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
      width="1"
      height="1"
      style={{ border: 0 }}
    />
  </form>
);

export default PaypalButton;
