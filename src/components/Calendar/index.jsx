import React, { useState, useEffect } from "react";
import s from "./index.module.scss";

const Calendar = () => {
  const now = new Date();
  const [today, setToday] = useState(now);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const updateToday = () => {
    const newDate = new Date();
    setToday(newDate);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      if (
        newDate.getDate() !== today.getDate() ||
        newDate.getMonth() !== currentMonth ||
        newDate.getFullYear() !== currentYear
      ) {
        updateToday();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [today, currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysArray = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startDayOfWeek = firstDay.getDay();
    const endDayOfWeek = lastDay.getDay();

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ day: d.getDate(), inCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ day: i, inCurrentMonth: true });
    }

    for (let i = 1; days.length % 7 !== 0; i++) {
      days.push({ day: i, inCurrentMonth: false });
    }

    return days;
  };

  const days = getDaysArray(currentYear, currentMonth);

  return (
     <div className={s.calendar}>
    <div className={s.bgMonth}>
      {new Date(currentYear, currentMonth).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })}
    </div>

    <div className={s.calendar__header}>
      <button onClick={handlePrevMonth}>←</button>
      <button onClick={handleNextMonth}>→</button>
    </div>

    <div className={s.calendar__weekdays}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d}>{d}</div>
      ))}
    </div>

    <div className={s.calendar__days}>
      {days.map((d, idx) => (
        <div
          key={idx}
          className={`${s.day} ${!d.inCurrentMonth ? s["other-month"] : ""} ${
            d.inCurrentMonth &&
            d.day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
              ? s.today
              : ""
          }`}
        >
          {d.day}
        </div>
      ))}
    </div>
  </div>
  );
};

export default Calendar;
