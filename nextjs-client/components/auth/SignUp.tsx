import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import { getAuth } from "@firebase/auth";
import style from "../../styles/auth.module.scss";
import { useLocalize } from "localize-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const auth = getAuth();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const { translate } = useLocalize();

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
          placeholder={translate("e-mail")}
          onChange={(e) => setEmail(e.target.value)}
          className="authinput"
        />
        <input
          value={name}
          placeholder={translate("your-first-name")}
          onChange={(e) => setName(e.target.value)}
          className="authinput"
        />
        <input
          value={lastname}
          placeholder={translate("your-last-name")}
          onChange={(e) => setLastname(e.target.value)}
          className="authinput"
        />

        <input
          type="password"
          placeholder={translate("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authinput"
        />
        <input
          type="password"
          placeholder={translate("confirm-password")}
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          className="authinput"
        />
        <input
          className="authSubmit"
          value={translate("signup") + " →"}
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "1.2rem",
            textAlign: "left",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
}
