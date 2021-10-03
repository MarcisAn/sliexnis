import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";

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
          </div>
        </div>
      );

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
          </div>
        </div>
      );

    default:
      return <h2>Error</h2>;
  }
}
