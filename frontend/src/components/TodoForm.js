import React, { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {" "}
      {/* Added className */}
      <input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="add-new-todo-input"
      />
      <button type="submit">Add</button>{" "}
      {/* This button will pick up the general button styles and specific .todo-form button styles */}
    </form>
  );
}

export default TodoForm;
