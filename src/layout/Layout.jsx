import React from "react";
import s from "./layout.module.scss";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";
import LoFiPlayer from "../components/LoFiPlayer";
import PomodoroTimer from "../components/PomodoroTimer";
import Taskboard from "../components/Taskboard";
import Meta from "../components/Meta";

export default function Layout() {
  return (
    <div className={s.grid}>
      <div className={`${s.calendar} block`}>
        <Calendar />
      </div>
      <div className={`${s.clock} block`}>
        <Clock />
      </div>
      {/* <div className={`${s.meta} block`}><Meta /></div> */}

      <div className={`${s.pomodoro} block`}>
        <PomodoroTimer />
      </div>
      <div className={`${s.player} block`}>
        <LoFiPlayer />
      </div>
      <div className={`${s.kanban} block scroll`}>
        <Taskboard />
      </div>
    </div>
  );
}
