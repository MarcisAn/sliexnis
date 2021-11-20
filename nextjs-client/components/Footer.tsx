import Image from "next/image";
import Link from "next/link";
import Twitter from "../assets/icons/twitter.svg";
import Github from "../assets/icons/github.svg";
import { useLocalize } from "localize-react";

export default function Footer() {
  const env = process.env.NODE_ENV;
  const { translate } = useLocalize();
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
          href="/privacy-policy"
          onClick={async function sendMes() {
            if (process.env.NODE_ENV == "production") {
              await fetch(
                "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
                  "Uzklikšķināts uz privātuma politika"
              );
            }
          }}>
          {translate("privacy-policy")}
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="/terms-of-use"
          onClick={async function sendMes() {
            if (process.env.NODE_ENV == "production") {
              await fetch(
                "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
                  "Uzklikšķināts uz lietošanas noteikumiem"
              );
            }
          }}>
          {translate("terms-of-use")}
        </a>
      </div>
      <div style={{ color: "black", display: "flex", flexDirection: "column" }}>
        <span>
          <b>{translate("info-email")}</b>info@sliexnis.lv
        </span>
        <span>
          <b>{translate("tech-support")}</b>support@sliexnis.lv
        </span>
      </div>
      <div>
        <Link href="/twitter">
          <a
            onClick={async function sendMes() {
              if (process.env.NODE_ENV == "production") {
                await fetch(
                  "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
                    "Uzklikšķināts uz twittera"
                );
              }
            }}>
            <Image height="40px" width="40px" src={Twitter} />
          </a>
        </Link>
        <Link href="/github">
          <a
            onClick={async function sendMes() {
              if (process.env.NODE_ENV == "production") {
                await fetch(
                  "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
                    "Uzklikšķināts uz github"
                );
              }
            }}>
            <Image height="40px" width="40px" src={Github} />
          </a>
        </Link>
      </div>
    </footer>
  );
}
