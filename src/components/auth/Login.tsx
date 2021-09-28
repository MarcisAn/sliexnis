import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(email);
      console.log(password);
      await login(email, password);
      history.push("/");
    } catch {
      setError("Parole vai e-pasts ir nepareizs");
    }

    setLoading(false);
  }

  return (
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
  );
}
