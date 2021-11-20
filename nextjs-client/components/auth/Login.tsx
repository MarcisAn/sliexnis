import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import style from "../../styles/auth.module.scss";
import { useLocalize } from "localize-react";
export default function Signup() {
  const { translate } = useLocalize();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { login } = useAuth();
  const [error, setError] = useState("");
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setError("");
      if (process.env.NODE_ENV == "production") {
        await fetch(
          "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
            "Ielogošanās"
        );
      }
      await login(email, password);
      router.replace("/usercontainer");
    } catch (e) {
      console.log(e);
      setError(translate("invalid-login"));
      if (process.env.NODE_ENV == "production") {
        await fetch(
          "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
            "Neizdevās ielogoties"
        );
      }
    }
  }

  return (
    <div>
      <div>
        {error}
        <form className={style.authForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={translate("e-mail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="authinput"
          />
          {/*
          <button
            className="authswitchbtn"
            onClick={(e) => setIsForgotPassword(true)}>
            Aizmirsu paroli
          </button>*/}
          <input
            type="password"
            placeholder={translate("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="authinput"
          />
          <input
            className="authSubmit"
            type="submit"
            value={translate("login") + " →"}
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
    </div>
  );
}
