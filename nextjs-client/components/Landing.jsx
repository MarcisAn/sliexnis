import Header from "../assets/header.svg";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import styles from "../styles/auth.module.scss";
import Login from "./auth/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import firebaseApp from "../firebase";
import { useRouter } from "next/router";
import Signup from "./auth/SignUp";
import Footer from "./Footer";
import { LanguageContext } from "../pages/_app";
import { useLocalize } from "localize-react";
import LVimg from "../assets/landing/lv.png";
import ENimg from "../assets/landing/en.png";
import Landing_Info from "./Landing_Info";

export default function Landing() {
  const [selection, setSelection] = useState("login");
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { language, languages, setLang } = useContext(LanguageContext);
  const { translate } = useLocalize();

  function setSelectionFn(target) {
    setSelection(target);
  }
  function setLangFn(target) {
    setLang(target);
  }

  if (loading) {
    return <h2>{translate("loading")}</h2>;
  } else {
    if (user) {
      router.replace("/usercontainer");
      return <span />;
    } else {
      return (
        <div>
          <header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1em",
              }}>
              <Image src={Header} />
            </div>
          </header>

          <div className={styles.auth}>
            <h2
              style={
                selection == "login"
                  ? { backgroundColor: "#EEEEEE", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelectionFn("login")}>
              {translate("login")}
            </h2>
            <h2
              style={
                selection == "signup"
                  ? { backgroundColor: "#EEEEEE", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelectionFn("signup")}>
              {translate("signup")}
            </h2>
            <h2
              style={
                selection == "forgot"
                  ? { backgroundColor: "#EEEEEE", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelectionFn("forgot")}>
              {translate("forgot")}
            </h2>
          </div>
          <Selection />
          <Landing_Info />

          <Footer />
        </div>
      );
    }
  }

  function Selection() {
    switch (selection) {
      case "login":
        return <Login />;
        break;
      case "signup":
        return <Signup />;
        break;
      case "forgot":
        return <h2>{translate("forgot")}</h2>;
        break;

      default:
        return <h2>error</h2>;
        break;
    }
  }
}
