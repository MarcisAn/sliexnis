import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [username, setUsername] = useState("");

  const [isAvailable, setAvailability] = useState(true);

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password !== passwordConf) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  useEffect(() => {
    if (username) {
      firestore
        .collection("usernames")
        .doc(username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setAvailability(false);
          } else {
            // doc.data() will be undefined in this case
            setAvailability(true);
          }
        })
        .catch((error) => {});
    }
  }, [username]);

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
        {username ? (
          <UsernameAvailability isAvailable={isAvailable} username={username} />
        ) : (
          <span />
        )}
        <label>Lietotājvārds</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
function UsernameAvailability(props: any) {
  return (
    <>
      {props.isAvailable ? (
        <p style={{ color: "green" }}>Lietotājvārds ir pieejams</p>
      ) : (
        <p style={{ color: "red" }}>Lietotājvārds nav pieejams</p>
      )}
    </>
  );
}
