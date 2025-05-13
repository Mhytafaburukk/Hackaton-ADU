import React from "react";
import "./Alarm.css";

function Alarm({ alarms, setAlarms }) {
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
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

  return (
    <div className="alarm-container">
      <h2>Alarms</h2>
      <button onClick={setAlarm}>Set Alarm</button>
      {alarms.map((alarm, i) => (
        <div key={i} className="alarm-item">
          <span>{alarm}</span>
          <button
            onClick={() => setAlarms(alarms.filter((_, index) => index !== i))}
          >
            Delete
          </button>
          <button
            onClick={() => {
              const updated = prompt("Edit alarm", alarm);
              if (updated) {
                const updatedAlarms = [...alarms];
                updatedAlarms[i] = updated;
                setAlarms(updatedAlarms);
              }
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Alarm;
