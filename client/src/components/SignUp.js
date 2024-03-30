import logo from "../images/logo.png";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
      );
      return;
    }

    //Sending data to the Server..
    fetch("http://localhost:8000/SignUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);

          navigate("/", { state: { fromSignUp: true } });
        }
        console.log(data);
      });
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="SignUplogo" src={logo} alt="" />
          <p
            className="loginPara"
            style={{ fontSize: "15px", margin: "3px 0px", color: "black" }}
          >
            Sign Up to View & Rent PG
          </p>

          <div>
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <br />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <br />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
          </div>

          <p
            className="loginPara"
            style={{ fontSize: "15px ", margin: "7px", color: "black" }}
          >
            By Signing Up,you agree to our Term,
            <br /> privacy policy and cookies policy.
          </p>

          <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          />

          <hr />
        </div>

        <div className="form2">
          Already have an Account ?
          <Link to="/">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign In </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
