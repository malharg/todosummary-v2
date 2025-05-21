const API_BASE = process.env.REACT_APP_API_URL;
import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton"; // Import the new SummaryButton component
import "./App.css"; // Import the main CSS file

function App() {
  const [todos, setTodos] = useState([]);

  const [summaryStatus, setSummaryStatus] = useState("idle");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle

  // Effect to apply/remove dark-mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Optionally set an error message for the user
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const res = await axios.post(`${API_BASE}/todos`, { title });
      setTodos([res.data, ...todos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const summarizeTodos = async () => {
    setSummaryStatus("sending"); // Set status to sending immediately
    try {
      await axios.post(`${API_BASE}/todos/summarize`); // Updated endpoint
      setSummaryStatus("success"); // Set status to success on successful response
    } catch (error) {
      console.error("Error sending summary:", error);
      setSummaryStatus("failure"); // Set status to failure on error
    } finally {
      // Reset status after a delay
      setTimeout(() => setSummaryStatus("idle"), 3000); // Reset after 3 seconds
    }
  };

  return (
    <div className="app-container">
      {" "}
      {/* Applied main container class */}
      <header className="app-header">
        {" "}
        {/* Header for title and toggle */}
        <img src="/document.svg" alt="Todo Icon" className="app-icon" />{" "}
        {/* Placeholder for icon */}
        <h1>Todo Summary Assistant</h1>
        <button
          className="dark-mode-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main className="main-content">
        {" "}
        {/* Main content area */}
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} />
        {}
        <SummaryButton onClick={summarizeTodos} status={summaryStatus} />
        {}
      </main>
    </div>
  );
}

export default App;
