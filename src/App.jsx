import React, { useState, useEffect } from "react";
import Clock from "./components/clock/Clock";
import Alarm from "./components/alarm/Alarm";
import ToDoList from "./components/to-do/ToDoList";
import Stopwatch from "./components/stopwatch/Stopwatch";

import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";
import bg4 from "./assets/bg4.jpg";
import bg5 from "./assets/bg5.jpg";
import bg6 from "./assets/bg6.jpg";

import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState("");
  const [stopwatch, setStopwatch] = useState(0);
  const [running, setRunning] = useState(false);
  const [background, setBackground] = useState(bg1);
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const [isToDoVisible, setIsToDoVisible] = useState(false);
  const [isStopwatchVisible, setIsStopwatchVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedAlarms = JSON.parse(localStorage.getItem("alarms")) || [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setAlarms(savedAlarms);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [alarms, tasks]);

  useEffect(() => {
    const currentTime = formatTime(time);
    alarms.forEach((alarm) => {
      if (currentTime === alarm) {
        alert(`Alarm ringing: ${alarm}`);
        const originalTitle = document.title;
        document.title = `⏰ Alarm: ${alarm}`;
        setTimeout(() => {
          document.title = originalTitle;
        }, 10000);
      }
    });
  }, [time, alarms]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setStopwatch((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const padZero = (num) => (num < 10 ? `0${num}` : num);
  const formatTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}${meridiem}`;
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <div className="navbar">
        <button onClick={() => setIsAlarmVisible(!isAlarmVisible)}>
          Alarms
        </button>
        <button onClick={() => setIsToDoVisible(!isToDoVisible)}>To-Do</button>
        <button onClick={() => setIsStopwatchVisible(!isStopwatchVisible)}>
          Stopwatch
        </button>
        <select onChange={(e) => setBackground(e.target.value)}>
          <option value={bg1}>Background 1</option>
          <option value={bg2}>Background 2</option>
          <option value={bg3}>Background 3</option>
          <option value={bg4}>Background 4</option>
          <option value={bg5}>Background 5</option>
          <option value={bg6}>Background 6</option>
        </select>
      </div>

      <Clock time={time} />

      {isAlarmVisible && <Alarm alarms={alarms} setAlarms={setAlarms} />}

      {isToDoVisible && (
        <ToDoList
          tasks={tasks}
          setTasks={setTasks}
          newtask={newtask}
          setNewTask={setNewTask}
        />
      )}

      {isStopwatchVisible && (
        <Stopwatch
          stopwatch={stopwatch}
          setStopwatch={setStopwatch}
          running={running}
          setRunning={setRunning}
        />
      )}
    </div>
  );
}

export default App;
