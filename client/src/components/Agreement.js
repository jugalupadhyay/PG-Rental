import React, { useState } from "react";
import "./Agreement.css"; 
import { BsArrowLeft } from "react-icons/bs"; 
import { loadStripe } from "@stripe/stripe-js";

export default function Agreement() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // Define an array of lawyer details
  const lawyers = [
    {
      name: "",//write name
      address: "",//write address
      charge: 300,//write charge
      contact: "",//write contact number
    },
    {
      name: "",//write name
      address: "",//write address
      charge: 300,//write charge
      contact: "",//write contact number
    },
    {
      name: "",//write name
      address: "",//write address
      charge: 300,//write charge
      contact: "",//write contact number
    },
  ];

  const handlePayment = (lawyer) => {
    console.log(`Redirecting to payment for lawyer: ${lawyer.name}`);
    makePayment(lawyer.charge);
  };

  const makePayment = async (price) => {
    const stripe = await loadStripe(
      ""//write stripe api eg: pk_test...
    );

    try {
      const body = {
        products: [
          {
            name: "Notary Service",
            price: price,
          },
        ],
      };

      const baseUrl = "http://localhost:8000/";
      const response = await fetch(`${baseUrl}notary-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN", 
        },
        body: JSON.stringify(body),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  };

  return (
    <div>
      <div
        lg="1"
        xs="auto"
        onClick={() => window.history.back()}
        style={{ cursor: "pointer" }}
      >
        <BsArrowLeft size={30} />
      </div>
      <div className="agreement-container">
        <h2 className="agreement-heading">Lawyers for Rent Agreement:</h2>
        <div className="lawyer-details">
          {lawyers.map((lawyer, index) => (
            <div key={index} className="lawyer-item">
              <h3>{lawyer.name}</h3>
              <p>
                <strong>Address:</strong> {lawyer.address}
              </p>
              <p>
                <strong>Charge:</strong> {lawyer.charge}
              </p>
              <p>
                <strong>Contact:</strong> {lawyer.contact}
              </p>
              {user && (
                <>
                  <button onClick={() => handlePayment(lawyer)}>Pay Now</button>
                </>
              )}
              {index !== lawyers.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
