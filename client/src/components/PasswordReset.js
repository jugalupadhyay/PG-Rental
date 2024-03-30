import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
import "./PasswordReset.css";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const notifyA = (msg) => toast.error(msg);

  const handleReset = async (e) => {
    console.log("Password reset requested for email:", email);

    e.preventDefault();

    const res = await fetch("/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.status == 201) {
      setEmail("");
      setMessage(true);
    } else {
      notifyA("Invalid User");
    }
  };

  return (
    <div className="signIn">
      <div className="loginForm">
        <img className="SignUplogo" src={logo} alt="" />
        <h1>Enter Your Email</h1>

        <div>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password Reset Link Sent Successfully in Your Email
            </p>
          ) : (
            ""
          )}

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="button" id="loginbtn" onClick={handleReset}>
          Send
        </button>

        <hr />
        <p className="reset-pass">
          Remember your password?{" "}
          <Link to="/">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
