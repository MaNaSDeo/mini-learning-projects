import TodoBox from "./component/todo-box";
import TodoInput from "./component/todo-input";
import Pagination from "./component/pagination";
import "./App.css";
import { useContext, useState } from "react";
import { TodoContext } from "./component/todo-context/todo-context";

function App() {
  const {
    todoData,
    todoInputVisible,
    setTodoInputVisible,
    handleDeleteInBatch,
  } = useContext(TodoContext);

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const totalPages = Math.ceil(todoData.length / todosPerPage);

  const displayedTodos =
    todoData && todoData.length > todosPerPage
      ? todoData.slice(
          (currentPage - 1) * todosPerPage,
          currentPage * todosPerPage
        )
      : todoData;

  return (
    <div className="main-body">
      <div className="todo-container">
        <div className="add-delete-btn">
          <button onClick={setTodoInputVisible}>Add New Todo</button>
          <button onClick={handleDeleteInBatch}>Delete</button>
        </div>
        {todoInputVisible && <TodoInput />}
        {displayedTodos.length > 0 &&
          displayedTodos.map((item) => (
            <TodoBox key={item.id} id={item.id} content={item.todoText} />
          ))}
        {todoData && todoData.length > todosPerPage && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
