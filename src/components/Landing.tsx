import Auth from "./auth/Auth";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landingheader"></header>
      <div className="auth">
        <Auth />
      </div>
    </div>
  );
}
