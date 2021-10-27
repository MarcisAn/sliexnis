import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import { getAuth } from "@firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const auth = getAuth();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const { signup } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password !== passwordConf) {
      return setError("Paroles nesakrīt");
    }

    try {
      setError("");
      const username = name + " " + lastname;
      await signup(email, password, username);
      firestore.collection("users").doc(auth.currentUser?.uid).set({
        email: email,
        username: username,
        classes: [],
      });
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <div>
      <h2 className="authFormTitle">Reģistrēties</h2>
      {error}
      <form className="authForm" onSubmit={handleSubmit}>
        <label>E-pasts:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="authinput"
        />
        <label>Vārds</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="authinput"
        />
        <label>Uzvārds</label>
        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="authinput"
        />
        <label>Parole</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authinput"
        />
        <label>Paroles apstiprinājums</label>
        <input
          type="password"
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          className="authinput"
        />
        <input className="authSubmit" value="Reģistrēties" type="submit" />
      </form>
    </div>
  );
}
