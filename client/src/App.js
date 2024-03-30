import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import CancelNotaryPayment from "./components/CancelNotaryPayment";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Adminscreen from "./screens/Adminscreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp"; 
import Sucess from "./components/Sucess";
import Fail from "./components/Fail";
import {
  GoogleOAuthProvider,
} from "@react-oauth/google";
import ReportIssue from "./components/ReportIssue";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Admin from "./components/Admin";
import ContactAdmin from "./components/ContactAdmin";
import Agreement from "./components/Agreement";
import SuccessNotartPayment from "./components/SucessNotaryPayment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <GoogleOAuthProvider clientId=""> {/*write GoogleOAuthProvider api*/}
          {" "}
          <Routes>
            <Route path="/admin/*" element={<Adminscreen />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/home" element={<Homescreen />}></Route>
            <Route path="/success" element={<Sucess />}></Route>
            <Route
              path="/cancelnotary"
              element={<CancelNotaryPayment />}
            ></Route>
            <Route path="/issues" element={<ReportIssue />}></Route>
            <Route path="/cancel" element={<Fail />}></Route>
            <Route path="/panel" element={<Admin />}></Route>
            <Route path="/contact" element={<ContactAdmin />}></Route>
            <Route path="/password-reset" element={<PasswordReset />}></Route>
            <Route path="/agreement" element={<Agreement />}></Route>
            <Route
              path="/successnotary"
              element={<SuccessNotartPayment />}
            ></Route>
            <Route
              path="/forgotpassword/:id/:token"
              element={<ForgotPassword />}
            ></Route>
          </Routes>
          <ToastContainer />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
