import './styles/App.scss';
import Calendar from "./components/Calendar";
import Clock from "./components/Clock";
import LoFiPlayer from "./components/LoFiPlayer";
import PomodoroTimer from "./components/PomodoroTimer";
import Taskboard from "./components/Taskboard";

function App() {
  return (
    <div className="App">
      <Calendar />
      <Clock />
      <LoFiPlayer />
      <PomodoroTimer />
      <Taskboard />
    </div>
  );
}

export default App;
