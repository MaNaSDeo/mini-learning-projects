import { createContext, useCallback, useMemo, useReducer } from "react";

export const TodoContext = createContext({
  todoData: [],
  checkedIds: [],
  todoInputVisible: false,
  updateTodo: () => {},
  setTodoInputVisible: () => {},
  handleDelete: () => {},
  handleUpdate: () => {},
  handleAddTodo: () => {},
  setCheckedIds: () => {},
  handleDeleteInBatch: () => {},
});

// Defining the initial state
const todoInitialState = {
  todoData: JSON.parse(localStorage.getItem("todoData"))
    ? JSON.parse(localStorage.getItem("todoData"))
    : [],
  checkedIds: JSON.parse(localStorage.getItem("checkedIds"))
    ? JSON.parse(localStorage.getItem("checkedIds"))
    : [],
  todoInputVisible: false,
};

// The reducer function
function todoReducer(state, action) {
  if (action.type === "ADD_TODO") {
    const updatedState = {
      ...state,
      todoData: [
        ...state.todoData,
        { id: Date.now().toString(36), todoText: action.payload },
      ],
    };
    localStorage.setItem("todoData", JSON.stringify(updatedState.todoData));
    return updatedState;
  }
  if (action.type === "DELETE_TODO") {
    const updatedState = {
      ...state,
      todoData: state.todoData.filter((todo) => todo.id !== action.payload),
    };
    localStorage.setItem("todoData", JSON.stringify(updatedState.todoData));
    return updatedState;
  }
  if (action.type === "UPDATE_TODO") {
    const updatedState = {
      ...state,
      todoData: state.todoData.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todoText: action.payload.updateText }
          : todo
      ),
    };
    localStorage.setItem("todoData", JSON.stringify(updatedState.todoData));
    return updatedState;
  }
  if (action.type === "TOGGLE_INPUT") {
    return { ...state, todoInputVisible: !state.todoInputVisible };
  }
  if (action.type === "TOGGLE_CHECKED") {
    const updatedState = {
      ...state,
      checkedIds: state.checkedIds.includes(action.payload)
        ? state.checkedIds.filter((id) => id !== action.payload)
        : [...state.checkedIds, action.payload],
    };
    localStorage.setItem("checkedIds", JSON.stringify(updatedState.checkedIds));
    return updatedState;
  }
  if (action.type === "DELETE_BATCH") {
    const updatedState = {
      ...state,
      todoData: state.todoData.filter(
        (todo) => !state.checkedIds.includes(todo.id)
      ),
      checkedIds: [],
    };
    localStorage.setItem("todoData", JSON.stringify(updatedState.todoData));
    return updatedState;
  }

  return state;
}

export default function TodoContextProvider({ children }) {
  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);

  const setTodoInputVisible = useCallback(() =>
    todoDispatch({ type: "TOGGLE_INPUT" }, [])
  );
  const handleDelete = useCallback((id) =>
    todoDispatch({ type: "DELETE_TODO", payload: id }, [])
  );
  const handleUpdate = useCallback(
    (id, updateText) =>
      todoDispatch({ type: "UPDATE_TODO", payload: { id, updateText } }),
    []
  );
  const handleAddTodo = useCallback(
    (todoText) => todoDispatch({ type: "ADD_TODO", payload: todoText }),
    []
  );
  const setCheckedIds = useCallback(
    (id) => todoDispatch({ type: "TOGGLE_CHECKED", payload: id }),
    []
  );
  const handleDeleteInBatch = useCallback(
    () => todoDispatch({ type: "DELETE_BATCH" }),
    []
  );

  const todoValue = useMemo(
    () => ({
      todoData: todoState.todoData,
      checkedIds: todoState.checkedIds,
      todoInputVisible: todoState.todoInputVisible,
      setTodoInputVisible,
      handleDelete,
      handleUpdate,
      handleAddTodo,
      setCheckedIds,
      handleDeleteInBatch,
    }),
    [
      todoState,
      setTodoInputVisible,
      handleDelete,
      handleUpdate,
      handleAddTodo,
      setCheckedIds,
      handleDeleteInBatch,
    ]
  );

  return (
    <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
  );
}
