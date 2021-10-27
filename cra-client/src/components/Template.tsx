import LogOut from "../../../sliexnis-nextjs/components/auth/LogOut";
import "../styles/template.scss";
import { Link } from "react-router-dom";

export default function Template({ children }: any) {
  return (
    <div>
      <header>
        <h1>Sliexnis</h1>
        <LogOut />
      </header>
      <nav>
        <Link to="/">Kopskats</Link>
        <Link to="/calendar">Plānotājs</Link>
        <Link to="/settings">Uzstādījumi</Link>
      </nav>
      {children}

      <footer>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              Privātuma politika
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              Lietošanas noteikumi
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
