import React, { useState, useEffect } from 'react';
// useState => returns current state and a function to change it (use it to keep track of changes dynamically)
// https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h

// useEffect => used for saving and loading by (fetching data, local storage, etc)
// https://www.youtube.com/watch?v=0ZJgIjIuY7U

import localforage from 'localforage';  // For saving data locally 'Local Forage must be installed $npm install localforage'

// For styling
import './App.css';

// Task class definition
class Task {
  constructor(label) {
    this.label = label;
    this.status = 0;          // 0 for pending, 1 for done
  }
}

function App() {
  
  // State for current task input
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  
  // State for list of tasks
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on component mount (application start)
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await localforage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      await localforage.setItem('tasks', JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);


  // Add or update a task
  function addTask() {
    if (task.trim()) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].label = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, new Task(task)]);
      }
      setTask('');
      console.log(`Task added/updated!`);
    }
  }

  // Edit task
  function editTask(index) {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.label);
    setEditIndex(index);
    console.log(`Task is being edited!`);
  }

  // Mark task as done
  function markTaskDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 1;
    setTasks(updatedTasks);
    console.log(`Task marked as done!`);
  }

  // Delete task
  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    console.log(`Task deleted!`);
  }

  // Render a task item
  const renderTaskItem = (task, index) => (
    <div className="task" key={index}>
      <span className={task.status === 1 ? 'doneTask' : 'pendingTask'}>{task.label}</span>
      <button onClick={() => editTask(index)}>Edit</button>
      <button onClick={() => markTaskDone(index)} disabled={task.status === 1}>Done</button>
      <button onClick={() => deleteTask(index)}>Remove</button>
    </div>
  );

  // Application render
  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <input
        className="input"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>{editIndex !== -1 ? 'Update Task' : 'Add Task'}</button>
      <div className="task-list">
        {tasks.map(renderTaskItem)}
      </div>
    </div>
  );
}

export default App;