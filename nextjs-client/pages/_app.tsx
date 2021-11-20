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
