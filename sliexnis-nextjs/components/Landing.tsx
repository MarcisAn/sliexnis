import Link from "next/link";
import { useState } from "react";
import styles from "../styles/auth.module.scss";
import Login from "../components/auth/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import firebaseApp from "../firebase";
import { useRouter } from "next/router";
import Signup from "../components/auth/SignUp";
import Footer from "./Footer";
export default function Landing() {
  const [selection, setSelection] = useState("login");
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    if (user) {
      router.replace("/usercontainer");
      return <span />;
    } else {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Sliexnis</h1>
          <div className={styles.auth}>
            <h2 onClick={() => setSelection("login")}>Pieslēgties</h2>
            <h2 onClick={() => setSelection("signup")}>Reģistrēties</h2>
            <h2 onClick={() => setSelection("forgot")}>Aizmirsu paroli</h2>
          </div>
          <Selection />
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
        return <h2>Aizmirsu paroli</h2>;
        break;

      default:
        return <h2>error</h2>;
        break;
    }
  }
}