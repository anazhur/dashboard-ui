import React, { useState, useEffect } from "react";
import s from "./index.module.scss";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const digital = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateStr = time.toLocaleTimeString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hr = time.getHours();

  const secDeg = sec * 6;
  const minDeg = min * 6 + sec * 0.1;
  const hrDeg = (hr % 12) * 30 + min * 0.5;

  return (
    <div className={s.clock} aria-label={`Time ${digital}, ${dateStr}`}>
            <div className={s.analog} role="img" aria-label="Analog clock face">
        <div className={`${s.hand} ${s.hour}`}   style={{ transform: `rotate(${hrDeg}deg)` }} />
        <div className={`${s.hand} ${s.minute}`} style={{ transform: `rotate(${minDeg}deg)` }} />
        <div className={`${s.hand} ${s.second}`} style={{ transform: `rotate(${secDeg}deg)` }} />
        <div className={s.centerDot} />
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={s.tick} style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
      </div>
      <div className={s.top}>
        <div className={s.digital}>{digital}</div>
        <div className={s.date}>{dateStr}</div>
      </div>
    </div>
  );
};

export default Clock;
