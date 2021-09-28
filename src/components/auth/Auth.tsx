import React, { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { useEffect } from "react";

export default function Auth() {
  const [selection, setSelection] = useState("login");

  switch (selection) {
    case "login":
      return (
        <div className="authcontainer">
          <Login />
          <div className="authswitchbtncont">
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("signup")}>
              Reģistrēties
            </button>
            <div className="vertline" />
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("forgot")}>
              Aizmirsu paroli
            </button>
          </div>
        </div>
      );
      break;

    case "signup":
      return (
        <div className="authcontainer">
          <Signup />
          <div className="authswitchbtncont">
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("login")}>
              Pieslēgties
            </button>
            <div className="vertline" />
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("forgot")}>
              Aizmirsu paroli
            </button>
          </div>
        </div>
      );
      break;
    case "forgot":
      return (
        <div className="authcontainer">
          <ForgotPassword />
          <div className="authswitchbtncont">
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("login")}>
              Pieslēgties
            </button>
            <div className="vertline" />
            <button
              className="authswitchbtn"
              onClick={(e) => setSelection("signup")}>
              Reģistrēties
            </button>
          </div>
        </div>
      );
      break;

    default:
      return <h2>Error</h2>;
      break;
  }

  return (
    <div>
      <Login />
      <div className="authswitchbtncont">
        <button className="authswitchbtn">Reģistrēties</button>
        <div className="vertline" />
        <button className="authswitchbtn">Aizmirsu paroli</button>
      </div>
    </div>
  );
}
