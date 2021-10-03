import Auth from "./auth/Auth";
import "../styles/landing.scss";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landingheader">
        <h1>sliexnis</h1>
      </header>
      <div className="auth">
        <Auth />
      </div>
    </div>
  );
}
