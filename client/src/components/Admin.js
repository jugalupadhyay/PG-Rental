import React, { useState, useContext } from "react";
import "./Admin.css";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }

    fetch("http://localhost:8000/admin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/admin/*");
          window.location.reload();
        }

        if (localStorage.getItem) {
          console.log(localStorage.getItem("jwt"));
        }
        console.log(data);
      });
  };

  return (
    <div
      className="signIn"
      style={{
        backgroundImage: `url("")`, //write background image url
      }}
    >
      <div>
        <div className="loginForm">
          <img className="SignUplogo" src={logo} alt="" />

          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            id="loginbtn"
            value="Sign In"
            onClick={() => {
              postData();
            }}
          />

          <hr />
        </div>

        <div className="loginForm2">
          Not An Admin?
          <Link to="/">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
