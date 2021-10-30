import Image from "next/image";
import Link from "next/link";
import Twitter from "../assets/icons/twitter.svg";
import Github from "../assets/icons/github.svg";

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
      }}>
      <div className="legal">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          Privātuma politika
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          Lietošanas noteikumi
        </a>
      </div>
      <div>
        <Link href="https://twitter.com/rickastley">
          <a>
            <Image height="40px" width="40px" src={Twitter} />
          </a>
        </Link>
        <Link href="https://github.com/rick/roll">
          <a>
            <Image height="40px" width="40px" src={Github} />
          </a>
        </Link>
      </div>
    </footer>
  );
}
