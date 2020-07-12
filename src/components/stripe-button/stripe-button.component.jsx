import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H4218Llfjm1MpHAZPaTJpWYiDHmBYoeYpeZKsULvADngCtX6jjJEROiZsPbAR4gEGfoMzAVr6ocfDbrkCW69jHQ00bMLVl4Vi";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total price is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
