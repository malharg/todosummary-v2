import React from "react";

function TodoList({ todos, onDelete }) {
  return (
    <div className="todo-list">
      {" "}
      {/* Added a div wrapper with class for consistent spacing/layout */}
      <ul>
        {" "}
        {/* Added className for the unordered list */}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {" "}
            {/* Added className for each list item */}
            <span>{todo.title}</span>{" "}
            {/* Wrapped title in a span for separate styling */}
            <button
              onClick={() => onDelete(todo.id)}
              className="delete-button" // Added className for the delete button
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
