import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Load API base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API_URL}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`${API_URL}/tasks/${id}`, { completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>📝 Task Manager</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id, !task.completed)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "" }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
