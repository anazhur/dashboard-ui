import React, { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import s from "./index.module.scss";

const themes = [
  { name: "areia", color: "#e9dec9" },
  { name: "glaciar", color: "#728394" },
  { name: "azul", color: "#28374A" },
  { name: "terra", color: "#754437" },
  { name: "verde", color: "#6B6751" },
  { name: "oscuro", color: "#162127" },
];

const SettingsPanel = () => {
  const { timeFormat, setTimeFormat, theme, setTheme } =
    useContext(SettingsContext);
  return (
    <div className={s.panel}>
      <h3 className={s.title}>Settings</h3>

      <div className={s.section}>
        <p className={s.label}>Time format</p>
        <div className={s.options}>
          <button
            className={`${s.option} ${timeFormat === "24h" ? s.active : ""}`}
            onClick={() => setTimeFormat("24h")}
          >
            24h
          </button>
          <button
            className={`${s.option} ${timeFormat === "12h" ? s.active : ""}`}
            onClick={() => setTimeFormat("12h")}
          >
            12h
          </button>
        </div>
      </div>

      <div className={s.section}>
        <p className={s.label}>Change theme</p>
        <div className={s.themes}>
        {themes.map((t) => (
          <button
            key={t.name}
            className={`${s.themeBtn} ${theme === t.name ? s.activeTheme : ""}`}
            style={{ background: t.color }}
            onClick={() => setTheme(t.name)}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
