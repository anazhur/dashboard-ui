import React, { useState, useEffect, useRef } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { RxReset } from "react-icons/rx";
import s from "./index.module.scss";

const INITIAL_TIME = 25 * 60;

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (secondsLeft === 12) {
      audioRef.current = new Audio("/timer-ending/ping.mp3");
      audioRef.current.play();
    }
  }, [secondsLeft]);

const toggleTimer = () => {
  if (secondsLeft === 0) {
    setSecondsLeft(INITIAL_TIME);
    setIsActive(true);


    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return;
  }

  setIsActive((prev) => {
    const next = !prev;

    if (!next && audioRef.current) {
      audioRef.current.pause();
    }

    return next;
  });
};

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(INITIAL_TIME);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const TOTAL_SEGMENTS = 40;
  const progress = (secondsLeft / INITIAL_TIME) * TOTAL_SEGMENTS;

  return (
    <div className={s.timer}>
  <div className={s.wrapper}>
    <svg viewBox="0 0 200 100" className={s.svg}>
      {Array.from({ length: 40 }).map((_, i) => {
        const progress = (secondsLeft / INITIAL_TIME) * 40;
        const angle = (i / 39) * Math.PI;

        const x1 = 100 + Math.cos(Math.PI - angle) * 98;
        const y1 = 100 - Math.sin(Math.PI - angle) * 98;

        const x2 = 100 + Math.cos(Math.PI - angle) * 85;
        const y2 = 100 - Math.sin(Math.PI - angle) * 85;

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={i < progress ? s.active : s.inactive}
          />
        );
      })}
    </svg>

    <div className={s.inner}>
      <div className={s.display}>
        {formatTime(secondsLeft)}
      </div>

      <div className={s.controls}>
        <button onClick={toggleTimer}>
          {isActive ? <FiPause /> : <FiPlay />}
        </button>

        <button onClick={handleReset}>
          <RxReset />
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default PomodoroTimer;