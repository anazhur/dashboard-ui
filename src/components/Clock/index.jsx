import React, {useState, useEffect} from 'react'
import s from "./index.module.scss";

const Clock = () => {

  const [time, setTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);


  return (
    <div><h2>Current time:</h2>
    <p>{time.toLocaleTimeString()}</p></div>
  )
}

export default Clock