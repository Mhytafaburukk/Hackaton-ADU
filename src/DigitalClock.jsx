import React , {useState,useEffect} from "react";
function DigitalClock() {
    const [time, setTime] = useState(new Date());
    const [Isvisible, setIsVisible] = useState(true);
    const [alarms , setAlarms] = useState([]);
    const [Isvisible2, setIsVisible2] = useState(false);

    useEffect(() => {
        const IntervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(IntervalId);
        };
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

    function Alarmfunction() {
        setIsVisible(!Isvisible);
    }
    function SetAlarmFunction() {
    const hour = prompt("Set a new hour (1-12)");
    const minute = prompt("Set a new minute (00-59)");
    const second = prompt("Set a new second (00-59)");
    const meridiem = prompt("Set AM or PM").toUpperCase();
        const newAlarm = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}${meridiem}`;
    
    
    const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]\s?(AM|PM)$/i;
    
    if (newAlarm && timeFormat.test(newAlarm.trim())) {
      setAlarms([...alarms, newAlarm.trim()]);
    } else if (newAlarm) {
      alert("Invalid format. Please enter time like '09:30:45AM'");
    }
    }
    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; 
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${meridiem}`;
    }
    function padZero(num) {
        return num < 10 ? `0${num}` : num;
    }
  return(
    <>
    <div className="clock-container">
            <div className="navbar">
                <button class="SetAlarmButton" onClick={Alarmfunction}>Alarms</button>
    </div>
      {Isvisible ? (
    <>
        <div className="clock">
            <h1>{formatTime()}</h1>
        </div>
    </>
  ) : (
    <>
    <div className="SetAlarm-container">
        <h1>Alarms</h1>
        <div className="alarms">
            {alarms.length === 0 ? (
                <>
                <button
  className="SetAlarmButton"
  onClick={() => {
    SetAlarmFunction();
    SortAlarms(); 
  }}
>
  SetAlarm
</button>
                <p>No alarms set</p>
                </>
            ) : (
                <>
              <button
              className="SetAlarmButton"
              onClick={() => {
              SetAlarmFunction();
              }}
              >
              Set Alarm
             </button>

            {alarms.map((alarm, index) => (
            <div key={index} className="alarm">
            <p>{alarm}</p>
            <button
            className="DeleteButton"
            onClick={() => {
            const newAlarms = [...alarms];
            newAlarms.splice(index, 1);
            setAlarms(newAlarms);
        }}
      >
        Delete
      </button>
      <button
        className="SetAlarmButton"
        onClick={() => {
          const newAlarms = [...alarms];
          const updated = prompt("Edit alarm time", alarms[index]);
          if (updated) {
            newAlarms[index] = updated;
            setAlarms(newAlarms);
          }
        }}
      >
        Edit
      </button>
    </div>
  ))}
</>
            )}
    </div>
    </div>
  </>
  )}
                {Isvisible2 && (
      
        <div className='To-Do-List'>
               <h1>To Do List</h1>
     <input value={newtask} placeholder='Please enter a task' onChange={handleInputchange}></input> <button className='Add-button' onClick={handleAddtoTasks}>Add</button>
     <ul>
        {tasks.map((task,index) => <li key={index}>
            {task} <button className='Delete-button' onClick={() => handleDeleteTask(index)}>Delete</button>
            <button className='Move-button' onClick={() => handleUpMove(index)}>Up</button> <button className='Move-button' onClick={() => handleDownMove(index)}>Down</button>
        </li>)}
     </ul>
        </div>
        
      )}
    </div>
    </>
  );
}
export default DigitalClock;
