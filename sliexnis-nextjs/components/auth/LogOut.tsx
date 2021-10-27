import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
export default function LogOut() {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      router.replace("/");
    } catch {}
  }

  return (
    <button className="userAction" value="Iziet" onClick={handleLogout}>
      Iziet
    </button>
  );
}
