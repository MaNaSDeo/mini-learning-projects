import { useContext, useState } from "react";
import { TodoContext } from "../todo-context/todo-context";
import "./TodoInput.css";

function TodoInput() {
  const { handleAddTodo, setTodoInputVisible } = useContext(TodoContext);

  const [todoText, setTodoText] = useState("");

  return (
    <div className="todo-input-container">
      <input
        type="text"
        className="todo-input"
        placeholder="Add Todo...!"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />

      <button
        className="add-todo"
        onClick={() => {
          if (todoText.length >= 5) handleAddTodo(todoText);
          setTodoInputVisible(false);
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default TodoInput;
