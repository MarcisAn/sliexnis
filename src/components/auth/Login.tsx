import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { login } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setError("");
      await login(email, password);
      history.push("/");
    } catch {
      setError("Parole vai e-pasts ir nepareizs");
    }
  }

  return (
    <div>
      {isForgotPassword ? (
        <ForgotPassword>
          <button
            className="authswitchbtn"
            onClick={(e) => setIsForgotPassword(false)}>
            Pieslēgties
          </button>
        </ForgotPassword>
      ) : (
        <div>
          <h2 className="authFormTitle">Ieiet</h2>
          {error}

          <form className="authForm" onSubmit={handleSubmit}>
            <label>E-pasts:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="authinput"
            />
            <button
              className="authswitchbtn"
              onClick={(e) => setIsForgotPassword(true)}>
              Aizmirsu paroli
            </button>
            <label>Parole</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="authinput"
            />
            <input className="authSubmit" type="submit" value="Ieiet" />
          </form>
        </div>
      )}
    </div>
  );
}
