import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/payment.png";
import NotaryVerification from "../images/NotaryVerification.png";
import jsPDF from "jspdf";

export default function SuccessNotartPayment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const price = queryParams.get("price");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const name = queryParams.get("name");
    const price = queryParams.get("price");
    console.log("Name:", name);
    console.log("Price:", price);
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Notary Format", 10, 10);
    // Add body content
    doc.setFontSize(12);
    doc.text("Your Payment Was Successfully Processed.", 10, 30);
    doc.text(
      "Congratulations! You Made a Rent Agreement for 11 Months.",
      10,
      40
    );
    doc.text("After 11 Months, You Can Renew Your Rent Agreement.", 10, 50);
    doc.text(`Price: ${price}`, 10, 60);
    // Add notary verification image
    doc.addImage(NotaryVerification, "PNG", 10, 70, 30, 30);
    // Add signature area
    doc.setFontSize(10);
    doc.text("Signature of Notary:", 10, 110);
    doc.line(50, 115, 150, 115); // Line for signature
    // Add footer
    doc.setFontSize(8);
    doc.text("This document is Notary-approved.", 10, 190);
    doc.text(
      "For any inquiries, contact at your local Notary office.",
      10,
      195
    );
    // Save the PDF
    doc.save("Rent-Agreement.pdf");
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <div className="formm">
        {user && (
          <>
            <img src={logo} alt="" />
            <h1>Your Payment Was Successful</h1>
            <div className="login">
              <div>
                Congratulations! You Made Rent AgreeMent With Time Period for 11
                Months
              </div>
              <br />
              <div>Price: {price}</div>
              <br />

              <div className="download-container" onClick={handleDownloadPDF}>
                <i className="fas fa-download"></i> Download PDF
              </div>
              <hr />
              <Link to="/home">Go Back Home </Link>
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="/home">Go Back Home </Link>
          </>
        )}
      </div>
    </>
  );
}
