import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function LogOut() {
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/landing");
    } catch {}
  }

  return (
    <button className="userAction" value="Iziet" onClick={handleLogout}>
      Iziet
    </button>
  );
}
