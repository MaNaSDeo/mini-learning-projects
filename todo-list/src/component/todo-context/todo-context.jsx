import { createContext, useState, useReducer } from "react";

export const TodoContext = createContext({
  todoData: [],
  todoInputVisible: false,
  updateTodo: () => {},
  setTodoInputVisible: () => {},
  handleDelete: () => {},
  handleUpdate: () => {},
  handleAddTodo: () => {},
  setCheckedIds: () => {},
  handleDeleteInBatch: () => {},
});

function todoReducer(state, action) {}

export default function TodoContextProvider({ children }) {
  const todoArray = [
    {
      id: Date.now().toString(36),
      todoText: "Create a react project",
    },
    {
      id: 2,
      todoText: "Create a Type Script project",
    },
    {
      id: 3,
      todoText: "Create a Java Script project",
    },
    {
      id: 4,
      todoText: "Create a C++ project",
    },
  ];
  const [todoData, setTodoData] = useState([...todoArray]);
  const [todoInputVisible, setTodoInputVisible] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);

  const handleDelete = (id) => {
    setTodoData((prevTodo) => prevTodo.filter((item) => item.id !== id));
  };

  const handleUpdate = (id, value) => {
    setTodoData((prevTodo) => {
      return prevTodo.map((todo) =>
        todo.id === id ? { ...todo, todoText: value } : todo
      );
    });
  };

  const handleAddTodo = (todoText) => {
    setTodoData((prevTodo) => [
      ...prevTodo,
      { id: Date.now().toString(36), todoText: todoText },
    ]);
  };

  const handleDeleteInBatch = () => {
    setTodoData((prevTodo) =>
      prevTodo.filter((todo) => !checkedIds.includes(todo.id))
    );
    setCheckedIds([]);
  };

  const todoValue = {
    todoData,
    updateTodo: setTodoData,
    todoInputVisible,
    setTodoInputVisible,
    handleDelete,
    handleUpdate,
    handleAddTodo,
    setCheckedIds,
    handleDeleteInBatch,
  };

  return (
    <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
  );
}
