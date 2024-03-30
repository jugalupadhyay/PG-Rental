import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sucess.css";
import logo from "../images/payment.png";
import jsPDF from "jspdf";

export default function Sucess() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const price = queryParams.get("price");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const pdfRef = useRef(null);

  useEffect(() => {
    const name = queryParams.get("name");
    const price = queryParams.get("price");
    console.log("Name:", name);
    console.log("Price:", price);
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Your Payment Was Successful", 10, 10);
    doc.text(`Congratulations! You Rented A Property:${name}`, 10, 20);
    doc.text(`Price: ${price}`, 10, 30);
    doc.save("Payment-Confirmation.pdf");
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <div className="formm">
        {user && (
          <>
            <img src={logo} alt="" />
            <h1> Your Payment Was Successful </h1>
            <div className="login">
              <div>Congratulations! You Rented A Property:{name}</div>
              <br />
              <div>Price: {price}</div>
              <br />
              <div className="download-container" onClick={handleDownloadPDF}>
                <i className="fas fa-download"></i> Download PDF
              </div>
              <hr />
              <Link to="/home">Go Back Home </Link>
            </div>
            <hr />
            <Link to="/agreement">Rent Agreement For Student Only </Link>
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
