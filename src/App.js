import { useEffect, useState } from "react";
//importing Header component from components folder
import Header from "./components/Header";
//importing Form component from components folder
import Form from "./components/Form";
//importing TodoList component from components folder
import TodosList from "./components/TodoList";

// importing getItems function from api folder
import { getItems } from "./api";

function App() {
  // getting item from localStorage
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  //setting input (title of todo )in state using useState hook
  const [input, setInput] = useState("");

  //setting todos in state in the form of array
  const [todos, setTodos] = useState(initialState);

  //use this state to store edit todo obejct
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const itemSet = localStorage.getItem("todos") === null;
    //call getTodos function if "todos" key doesn't exist in local Storage
    if (itemSet) {
      getTodos();
    }
    // setting todos in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // getting todos from api
  const getTodos = async () => {
    setTodos(await getItems());
  };

  // rendering Header, Form & TodoList components
  return (
    <div className="App">
      <div>
        <h1>CREATE YOUR TODO</h1>
        <div className="app-wrapper">
          <div>
            <Header />
          </div>
          <div>
            <Form
              input={input}
              setInput={setInput}
              todos={todos}
              setTodos={setTodos}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
            />
          </div>
          <div>
            <TodosList
              todos={todos}
              setTodos={setTodos}
              setEditTodo={setEditTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
