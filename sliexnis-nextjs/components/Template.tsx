import LogOut from "./auth/LogOut";
import Link from "next/link";
import dashboard from "../styles/dashboard.module.scss";
import Footer from "./Footer";

export default function Template({ children }: any) {
  return (
    <div className={dashboard.dashboard}>
      <header>
        <h1>Sliexnis</h1>
        <LogOut />
      </header>
      <nav>
        <Link href="/usercontainer/dashboard">Kopskats</Link>
        <Link href="/usercontainer/calendar">Plānotājs</Link>
        <Link href="/usercontainer/settings">Uzstādījumi</Link>
      </nav>
      {children}
      <Footer />
    </div>
  );
}
