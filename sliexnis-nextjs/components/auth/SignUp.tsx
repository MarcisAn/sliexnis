import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import { getAuth } from "@firebase/auth";
import style from "../../styles/auth.module.scss";

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
      setError("Neizdevās izveidot kontu");
    }
  }

  return (
    <div>
      {error}
      <form className={style.authForm} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="E-pasts"
          onChange={(e) => setEmail(e.target.value)}
          className="authinput"
        />
        <input
          value={name}
          placeholder="Tavs vārds"
          onChange={(e) => setName(e.target.value)}
          className="authinput"
        />
        <input
          value={lastname}
          placeholder="Tavs uzvārds"
          onChange={(e) => setLastname(e.target.value)}
          className="authinput"
        />

        <input
          type="password"
          placeholder="Parole"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authinput"
        />
        <input
          type="password"
          placeholder="Paroles apstiprinājums"
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          className="authinput"
        />
        <input className="authSubmit" value="Reģistrēties" type="submit" />
      </form>
    </div>
  );
}
