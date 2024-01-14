import TodoBox from "./component/todo-box";
import TodoInput from "./component/todo-input";
import "./App.css";
import { useContext } from "react";
import { TodoContext } from "./component/todo-context/todo-context";

function App() {
  const {
    todoData,
    todoInputVisible,
    setTodoInputVisible,
    handleDeleteInBatch,
  } = useContext(TodoContext);

  return (
    <div className="main-body">
      <div className="todo-container">
        <div className="add-delete-btn">
          <button onClick={setTodoInputVisible}>Add New Todo</button>
          <button onClick={handleDeleteInBatch}>Delete</button>
        </div>
        {todoInputVisible && <TodoInput />}
        {todoData.length > 0 &&
          todoData.map((item) => (
            <TodoBox key={item.id} id={item.id} content={item.todoText} />
          ))}
      </div>
    </div>
  );
}

export default App;
