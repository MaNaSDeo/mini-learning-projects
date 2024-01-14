import { useContext, useState } from "react";
import { TodoContext } from "../todo-context/todo-context";
import "./TodoBox.css";

function TodoBox({ id, content }) {
  const { handleDelete, handleUpdate, setCheckedIds } = useContext(TodoContext);

  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(content);

  return (
    <div className="todo-box">
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          onChange={() =>
            // setCheckedIds((prevId) =>
            //   prevId.includes(id)
            //     ? [...prevId.filter((_id) => _id !== id)]
            //     : [...prevId, id]
            // )
            setCheckedIds(id)
          }
        />
        {isEditable ? (
          <input
            type="text"
            value={value}
            className="edit-input"
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <p className="todo-text">{content}</p>
        )}
      </div>
      <div className="todo-btn">
        <button
          className="delete-btn btn"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </button>
        {isEditable ? (
          <button
            className="edit-btn btn"
            onClick={() => {
              handleUpdate(id, value);
              setIsEditable(false);
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="edit-btn btn"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoBox;
