import React, { useState, useEffect } from "react";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";
import bg4 from "./assets/bg4.jpg";
import bg5 from "./assets/bg5.jpg";
import bg6 from "./assets/bg6.jpg";

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [isToDoVisible, setIsToDoVisible] = useState(false);
  const [isStopwatchVisible, setIsStopwatchVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState("");
  const [stopwatch, setStopwatch] = useState(0);
  const [running, setRunning] = useState(false);
  const [background, setBackground] = useState(bg1);

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

  const changeBackground = (bg) => {
    setBackground(bg);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkAlarms = () => {
      const currentTime = formatTime();
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
    };
    checkAlarms();
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

  function formatTime() {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}${meridiem}`;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  function formatStopwatch(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
  }

  function setAlarm() {
    const hour = prompt("Set hour (1-12)");
    const minute = prompt("Set minute (00-59)");
    const second = prompt("Set second (00-59)");
    const meridiem = prompt("AM or PM").toUpperCase();
    const newAlarm = `${padZero(hour)}:${padZero(minute)}:${padZero(
      second
    )}${meridiem}`;
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9](AM|PM)$/i;
    if (regex.test(newAlarm)) {
      setAlarms([...alarms, newAlarm]);
    } else {
      alert("Invalid format. Try '09:30:45AM'");
    }
  }

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleAddTask() {
    if (newtask.trim() !== "") {
      setTasks([
        ...tasks,
        { text: newtask.trim(), completed: false, id: Date.now() },
      ]);
      setNewTask("");
    }
  }

  function handleDeleteTask(i) {
    const updated = tasks.filter((task) => task.id !== i);
    setTasks(updated);
  }

  function handleUpMove(i) {
    if (i > 0) {
      const updated = [...tasks];
      [updated[i], updated[i - 1]] = [updated[i - 1], updated[i]];
      setTasks(updated);
    }
  }

  function handleDownMove(i) {
    if (i < tasks.length - 1) {
      const updated = [...tasks];
      [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
      setTasks(updated);
    }
  }

  function handleToggleCompletion(i) {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  }

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
        <select onChange={(e) => changeBackground(e.target.value)}>
          <option value={bg1}>Background 1</option>
          <option value={bg2}>Background 2</option>
          <option value={bg3}>Background 3</option>
          <option value={bg4}>Background 4</option>
          <option value={bg5}>Background 5</option>
          <option value={bg6}>Background 6</option>
        </select>
      </div>

      <h1 style={{ fontSize: "48px" }}>{formatTime()}</h1>

      {isAlarmVisible && (
        <div className="container">
          <h2>Alarms</h2>
          <button onClick={setAlarm}>Set Alarm</button>
          {alarms.map((a, i) => (
            <div key={i}>
              <span>{a}</span>
              <button
                onClick={() => {
                  const updated = alarms.filter((alarm, index) => index !== i);
                  setAlarms(updated);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const updated = prompt("Edit alarm", alarms[i]);
                  if (updated) {
                    const newList = [...alarms];
                    newList[i] = updated;
                    setAlarms(newList);
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {isToDoVisible && (
        <div className="container">
          <h2>To-Do List</h2>
          <input
            value={newtask}
            onChange={handleInputChange}
            placeholder="Enter task"
          />
          <button onClick={handleAddTask}>Add</button>
          <ul>
            {tasks.map((task, i) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(i)}
                />
                <span>{task.text}</span>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button onClick={() => handleUpMove(i)}>Up</button>
                <button onClick={() => handleDownMove(i)}>Down</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isStopwatchVisible && (
        <div className="container">
          <h2>Stopwatch</h2>
          <h3>{formatStopwatch(stopwatch)}</h3>
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Pause</button>
          <button
            onClick={() => {
              setRunning(false);
              setStopwatch(0);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default DigitalClock;
