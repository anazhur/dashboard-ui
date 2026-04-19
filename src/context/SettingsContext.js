import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("areia");
  const [timeFormat, setTimeFormat] = useState("24h");

  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      const parsed = JSON.parse(saved);

      setTheme(parsed.theme || "areia");
      setTimeFormat(parsed.timeFormat || "24h");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ theme, timeFormat }),
    );
  }, [theme, timeFormat]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        timeFormat,
        setTimeFormat,
      }}
    >{children}</SettingsContext.Provider>
  );
};
