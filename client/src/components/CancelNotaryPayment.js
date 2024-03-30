import React from "react";
import { Link } from "react-router-dom";
import "./Sucess.css";
import failImage from "../images/fail.png";

export default function CancelNotaryPayment() {
  return (
    <>
      <meta charSet="UTF-8" />
      <div className="formm">
        <img src={failImage} alt="" />

        <h1>Payment Failed</h1>
        <div className="login">
          <div>
            If Any Money Got Deducted From Your Account, It Will Be Refunded
            Automatically
          </div>
          <br />
          <Link to="/agreement">Retry Payment</Link>
        </div>
      </div>
    </>
  );
}
