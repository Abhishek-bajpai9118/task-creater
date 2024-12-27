import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const apiUrl = "http://localhost:3000/api/tasks";

  const fetchTasks = async () => {
    const response = await axios.get(apiUrl);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!taskName.trim()) return alert("Task name is required");
    await axios.post(apiUrl, { name: taskName });
    setTaskName("");
    fetchTasks();
  };

  const updateTask = async (id) => {
    const newName = prompt("Enter the updated task name:");
    if (!newName) return alert("Task name is required");
    await axios.put(`${apiUrl}/${id}`, { name: newName });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-3 border rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-3 rounded"
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-3 border mb-2 rounded"
          >
            <span>{task.name}</span>
            <div>
              <button
                onClick={() => updateTask(task.id)}
                className="text-blue-500 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
