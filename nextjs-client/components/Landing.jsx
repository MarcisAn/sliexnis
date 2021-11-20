import Header from "../assets/header.svg";
import Image from "next/image";
import { useContext, useState } from "react";
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

export default function Landing() {
  const [selection, setSelection] = useState("login");
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { language, languages, setLang } = useContext(LanguageContext);
  const { translate } = useLocalize();

  function LangDot(props) {
    return (
      <div
        onClick={props.click}
        style={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
          backgroundColor: props.isActive == true ? "white" : "#e87a6b",
          border: props.isActive == true ? "2px solid black" : "none",
          color: props.isActive == true ? "black" : "white",
          textAlign: "center",
          lineHeight: "30px",
        }}>
        {props.lang}
      </div>
    );
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
                padding: "1em",
                display: "flex",
                flexDirection: "row",
                gap: "0.5em",
              }}>
              <LangDot
                lang="LV"
                isActive={language == "lv" ? true : false}
                click={() => setLang("lv")}
              />
              <LangDot
                lang="EN"
                isActive={language == "en" ? true : false}
                click={() => setLang("en")}
              />
            </div>
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
                  ? { backgroundColor: "white", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelection("login")}>
              {translate("login")}
            </h2>
            <h2
              style={
                selection == "signup"
                  ? { backgroundColor: "white", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelection("signup")}>
              {translate("signup")}
            </h2>
            <h2
              style={
                selection == "forgot"
                  ? { backgroundColor: "white", color: "red" }
                  : { backgroundColor: "black" }
              }
              onClick={() => setSelection("forgot")}>
              {translate("forgot")}
            </h2>
          </div>
          <Selection />
          <div style={{ marginTop: "10rem" }}>
            {language == "en" ? (
              <Image
                layout="responsive"
                src={ENimg}
                className="landing-picture"
              />
            ) : (
              <Image src={LVimg} className="landing-picture" />
            )}
          </div>
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
