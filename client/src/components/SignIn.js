import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
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

    fetch("http://localhost:8000/SignIn", {
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
          navigate("/home");
          window.location.reload(); 
        }
        console.log(data);
      });
  };

  const continueWithGoogle = (credentialResponse) => {
    console.log(credentialResponse);
    const jwtDetail = jwtDecode(credentialResponse.credential);
    console.log(jwtDetail);

    fetch("/googleLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        email: jwtDetail.email,
        email_verified: jwtDetail.email_verified,
        clientId: credentialResponse.clientId,
        Photo: jwtDetail.picture,
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
          navigate("/home");
          window.location.reload(); 
        }
        console.log(data);
      });
  };

  return (
    <div
      className="signIn"
      style={{
        backgroundImage: `url("")`,//write background image url
        backgroundSize: "cover",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div
          className="loginForm"
          style={{
            backgroundColor: "#ffffffcc",
            padding: 15,
            border: "1px solid rgb(129, 121, 121)",
            borderRadius: 1,
            width: "100%",
            maxWidth: 400,
            margin: 10,
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <img className="SignUplogo" src={logo} alt="" />
          <br></br>
          <a href="/home">Click here to take a look at the PGs</a>
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
            style={{
              backgroundColor: "#1773EA",
              border: "none",
              borderRadius: 3,
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              cursor: "pointer",
              width: "100%",
              marginTop: -4,
            }}
          />
          <hr />
          <p className="reset-pass">
            {" "}
            Forgot Password?{" "}
            <Link to="/password-reset">
              <span style={{ color: "blue", cursor: "pointer" }}>
                Click Here
              </span>
            </Link>
          </p>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                continueWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <div
          className="loginForm2"
          style={{
            backgroundColor: "#ffffffcc",
            padding: 20,
            border: "1px solid rgb(129, 121, 121)",
            borderRadius: 1,
            width: "100%",
            maxWidth: 400,
            margin: 10,
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          Don't have an account?
          <Link to="/SignUp">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
          <div className="form3">
            Admin Panel Login
            <Link to="/panel">
              <span style={{ color: "blue", cursor: "pointer" }}>
                {" "}
                Adminscreen{" "}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
