import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationConsumer, LocalizationProvider } from "localize-react";
import { useContext, createContext, useState } from "react";
import translations from "../translations.json";

const languages = ["lv", "en"];
export const LanguageContext = createContext({});

function App({ Component, pageProps }: AppProps) {
  const [langauge, setLang] = useState(languages[1]);
  return (
    <LanguageContext.Provider value={{ langauge, languages, setLang }}>
      <LocalizationProvider
        disableCache
        locale={langauge}
        translations={translations}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </LocalizationProvider>
    </LanguageContext.Provider>
  );
}
export default App;
