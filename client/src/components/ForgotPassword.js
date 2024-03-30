import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const notifyA = (msg) => toast.error(msg);

  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("User Valid");
    } else {
      notifyA("Page Not Found.");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.status == 201) {
      setPassword("");
      setMessage(true);
    } else {
      notifyA("! Token Expired Generate New Link.");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div className="signIn">
      <div className="loginForm">
        <img className="SignUplogo" src={logo} alt="" />
        <h1>Enter Your New Password</h1>
        <div>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password Successfully Updated
            </p>
          ) : (
            ""
          )}
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={setval}
            placeholder="New Password"
          />
        </div>
        <button type="button" id="loginbtn" onClick={sendpassword}>
          Send
        </button>
        <hr />
      </div>
    </div>
  );
};

export default ForgotPassword;
