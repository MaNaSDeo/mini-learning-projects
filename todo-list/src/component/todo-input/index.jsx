import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../todo-context/todo-context";
import "./TodoInput.css";

function TodoInput() {
  const { handleAddTodo, todoInputVisible, setTodoInputVisible } =
    useContext(TodoContext);

  const [todoText, setTodoText] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    if (todoInputVisible) inputRef.current.focus();
  }, [todoInputVisible]);

  return (
    <div className="todo-input-container">
      <input
        type="text"
        className="todo-input"
        placeholder="Add Todo...!"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        ref={inputRef}
      />

      <button
        className="add-todo"
        onClick={() => {
          if (todoText.length >= 5) handleAddTodo(todoText);
          setTodoInputVisible();
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default TodoInput;
