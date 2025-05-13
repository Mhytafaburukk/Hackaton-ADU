import React from "react";
import "./Stopwatch.css";

function Stopwatch({ stopwatch, setStopwatch, running, setRunning }) {
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  const formatStopwatch = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
  };

  return (
    <div className="stopwatch-container">
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
  );
}

export default Stopwatch;
