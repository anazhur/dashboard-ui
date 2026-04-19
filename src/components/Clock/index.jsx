import React, { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { IoSettingsOutline } from "react-icons/io5";
import s from "./index.module.scss";
import Modal from "../Modal/index"
import SettingsPanel from "../SettingsPanel";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const { timeFormat } = useContext(SettingsContext);
  const is12h = timeFormat === "12h";
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const digital = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: is12h,
  });

  const ampm = is12h
    ? time
        .toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
        .slice(-2)
    : null;

  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hr = time.getHours();

  const secDeg = sec * 6;
  const minDeg = min * 6 + sec * 0.1;
  const hrDeg = (hr % 12) * 30 + min * 0.5;

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const todayIndex = (time.getDay() + 6) % 7;

  return (
    <div className={s.clock}>
      <div className={s.digitalBg}>
        <span className={s.group}>{digital.slice(0, 2)}</span>
        <span className={s.colon}>:</span>
        <span className={s.group}>{digital.slice(3, 5)}</span>
      </div>

      {ampm && <div className={s.ampm}>{ampm}</div>}

      <div className={s.analog}>
        <div
          className={`${s.hand} ${s.hour}`}
          style={{ transform: `rotate(${hrDeg}deg)` }}
        />
        <div
          className={`${s.hand} ${s.minute}`}
          style={{ transform: `rotate(${minDeg}deg)` }}
        />
        <div
          className={`${s.hand} ${s.second}`}
          style={{ transform: `rotate(${secDeg}deg)` }}
        />
        <div className={s.centerDot} />

        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={s.tick}
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>

      <div className={s.week}>
        {days.map((d, i) => (
          <span key={d} className={i === todayIndex ? s.activeDay : ""}>
            {d}
          </span>
        ))}
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}><SettingsPanel /></Modal>

      <button className={`${s.settingsBtn} pressable`} onClick={() => setIsSettingsOpen(true)}>
        <IoSettingsOutline />
      </button>
    </div>
  );
};

export default Clock;
