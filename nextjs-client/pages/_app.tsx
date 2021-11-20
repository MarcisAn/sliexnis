import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationConsumer, LocalizationProvider } from "localize-react";
import { useContext, createContext, useState } from "react";
import translations from "../translations.json";

const languages = ["lv", "en"];
export const LanguageContext = createContext({});

function App({ Component, pageProps }: AppProps) {
  const [language, setLang] = useState(languages[1]);

  const env = process.env.NODE_ENV;
  if (env == "development") {
  } else if (env == "production") {
    const message = "apmeklejums";
    fetch(
      "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
        message
    );
  }

  return (
    <LanguageContext.Provider value={{ language, languages, setLang }}>
      <LocalizationProvider
        disableCache
        locale={language}
        translations={translations}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </LocalizationProvider>
    </LanguageContext.Provider>
  );
}
export default App;
