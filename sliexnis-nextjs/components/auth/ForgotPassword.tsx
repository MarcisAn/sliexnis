import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword({ children }: any) {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div>
      <h2 className="authFormTitle">Atjaunot paroli</h2>
      {message}
      {error}
      {loading ? "Ielādējās" : <span />}
      <form onSubmit={handleSubmit} className="authForm">
        <label>e-pasts ar kuru tika izveidots konts</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="authinput"
        />
        <input className="authSubmit" type="submit" value="Atjaunot paroli" />
      </form>
      {children}
    </div>
  );
}
