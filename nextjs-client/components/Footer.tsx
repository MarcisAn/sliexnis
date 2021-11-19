import Image from "next/image";
import Link from "next/link";
import Twitter from "../assets/icons/twitter.svg";
import Github from "../assets/icons/github.svg";
import { useLocalize } from "localize-react";
export default function Footer() {
  const { translate } = useLocalize();
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
      }}>
      <div className="legal">
        <a target="_blank" rel="noreferrer" href="/privacy-policy">
          {translate("privacy-policy")}
        </a>
        <a target="_blank" rel="noreferrer" href="/terms-of-use">
          {translate("terms-of-use")}
        </a>
      </div>
      <div>
        <Link href="/twitter">
          <a>
            <Image height="40px" width="40px" src={Twitter} />
          </a>
        </Link>
        <Link href="/github">
          <a>
            <Image height="40px" width="40px" src={Github} />
          </a>
        </Link>
      </div>
    </footer>
  );
}
