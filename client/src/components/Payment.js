import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

export default function Payment({ pg }) {
  const [facility, setFacility] = useState(pg.facility[0]);
  const [variant, setVariant] = useState(pg.variants[0]);
  const history = useHistory();

  const getPrice = () => {};

  const makePayment = async () => {
    const stripe = await loadStripe(
      ""//write stripe api eg: pk_test...
    );

    const productName = pg.name;
    const productPrice = getPrice();

    history.push("/success", { productName, productPrice });
  };

  return (
    <div className="payment-page">
      <button onClick={makePayment}>Make Payment</button>
    </div>
  );
}
