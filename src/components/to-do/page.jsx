import React, { useState } from "react";

function ToDoList() {
  const [tasks, settasks] = useState([]);
  const [newtask, setnewtask] = useState("");

  function handleInputchange(event) {
    setnewtask(event.target.value);
  }
  function handleAddtoTasks() {
    if (newtask.trim() !== "") {
      settasks((t) => [...t, newtask]);
    }
  }
  function handleDeleteTask(index) {
    settasks(tasks.filter((_, i) => i !== index));
  }
  function handleUpMove(index) {
    if (index > 0) {
      const UpdatedTask = [...tasks];
      [UpdatedTask[index], UpdatedTask[index - 1]] = [
        UpdatedTask[index - 1],
        UpdatedTask[index],
      ];
      settasks(UpdatedTask);
    }
  }
  function handleDownMove(index) {
    if (index < tasks.length - 1) {
      const UpdatedTask = [...tasks];
      [UpdatedTask[index], UpdatedTask[index + 1]] = [
        UpdatedTask[index + 1],
        UpdatedTask[index],
      ];
      settasks(UpdatedTask);
    }
  }

  return (
    <div className="To-Do-List">
      <h1>To Do List</h1>
      <input
        value={newtask}
        placeholder="Please enter a task"
        onChange={handleInputchange}
      ></input>{" "}
      <button className="Add-button" onClick={handleAddtoTasks}>
        Add
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button
              className="Delete-button"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
            <button className="Move-button" onClick={() => handleUpMove(index)}>
              Up
            </button>{" "}
            <button
              className="Move-button"
              onClick={() => handleDownMove(index)}
            >
              Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
