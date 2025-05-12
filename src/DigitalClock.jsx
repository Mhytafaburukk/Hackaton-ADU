import React , {useState,useEffect} from "react";
function DigitalClock() {
    const [time, setTime] = useState(new Date());
    const [Isvisible, setIsVisible] = useState(true);
    const [alarms , setAlarms] = useState([]);
    const[newHour , setNewHour] = useState(0);
    const[newMinute , setNewMinute] = useState(0);
    const[newSecond , setNewSecond] = useState(0);
    const[newMeridiem , setNewMeridiem] = useState("AM");

    useEffect(() => {
        const IntervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(IntervalId);
        };
    }, []);

    function Alarmfunction() {
        setIsVisible(!Isvisible);
    }
    function SetAlarmFunction() {
        setNewHour(prompt("Set a new hour"));
        setNewMinute(prompt("Set a new minute"));
        setNewSecond(prompt("Set a new second"));
        setNewMeridiem(prompt("Set AM or PM"));
        const newAlarm = `${newHour}:${newMinute}:${newSecond} ${newMeridiem}`;
    
    
    const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]\s?(AM|PM)$/i;
    
    if (newAlarm && timeFormat.test(newAlarm.trim())) {
      setAlarms([...alarms, newAlarm.trim()]);
    } else if (newAlarm) {
      alert("Invalid format. Please enter time like '09:30:45 AM'");
    }
    }
    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; 
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
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
                alarms.map((alarm, index) => (
                    <div key={index} className="alarm">
                        <p>{alarm}</p>
                        <button className="DeleteButton" onClick={() => {
                            const newAlarms = [...alarms];
                            newAlarms.splice(index, 1);
                            setAlarms(newAlarms);
                        }}>Delete</button>
                        <button className="SetAlarmButton" onClick={() => {
                            const newAlarms = [...alarms];
                            newAlarms[index] = prompt("Edit alarm time", alarms[index]);
                            setAlarms(newAlarms);
                        }}>Edit</button>
                    </div>
                ))
            )}
    </div>
    </div>
  </>
  )}
    </div>
    </>
  );
}
export default DigitalClock;