import Link from "next/link";
import dashboard from "../styles/dashboard.module.scss";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Logo from "../assets/icons/logo.svg";
import Image from "next/image";
import Logout from "../assets/icons/logout.png";
import { useAuth } from "../contexts/AuthContext";
export default function Template({ children }: any) {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      router.replace("/");
    } catch {}
  }
  return (
    <div className={dashboard.dashboard}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
        }}>
        <span style={{ margin: "0.5em" }}>
          <Image src={Logo} width="50px" height="50px" />
        </span>
        <nav>
          <Link href="/usercontainer/dashboard">
            <h2
              style={
                router.pathname == "/usercontainer/dashboard"
                  ? { backgroundColor: "white", color: "var(--sliexnis-red)" }
                  : { backgroundColor: "black", color: "var(--sliexnis-gray)" }
              }>
              Kopskats
            </h2>
          </Link>
          <Link href="/usercontainer/calendar">
            <h2
              style={
                router.pathname == "/usercontainer/calendar"
                  ? { backgroundColor: "white", color: "var(--sliexnis-red)" }
                  : { backgroundColor: "black", color: "var(--sliexnis-gray)" }
              }>
              Plānotājs
            </h2>
          </Link>
          <Link href="/usercontainer/settings">
            <h2
              style={
                router.pathname == "/usercontainer/settings"
                  ? { backgroundColor: "white", color: "var(--sliexnis-red)" }
                  : { backgroundColor: "black", color: "var(--sliexnis-gray)" }
              }>
              Uzstādījumi
            </h2>
          </Link>
        </nav>
        <span
          style={{
            margin: "auto",
            marginRight: "15px",
            marginLeft: "15px",
            cursor: "pointer",
          }}
          onClick={handleLogout}>
          <Image src={Logout} width="40px" height="40px" />
        </span>
      </header>

      {children}
      <Footer />
    </div>
  );
}
