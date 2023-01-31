// importing function from api folder to call the api
import { deleteItem, toggleComplete } from "../api";

//TodoList component
const TodosList = ({ todos, setTodos, setEditTodo }) => {
  //handling delete of todo
  const handleDelete = async (id) => {
    // calling deleteItem to call the api to delete it from the server
    const result = await deleteItem(id);
    if (result.status === 200) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      return;
    }
  };

  //Toggling the todo is completed or not
  const handleComplete = async (todo) => {
    // calling api to update the db
    const result = await toggleComplete(todo);
    if (result === 500) {
      console.log("Internal server error");
      return;
    }

    //update the local Storage
    setTodos(
      todos.map((item) => {
        if (item.id === result.id) {
          return result;
        }
        return item;
      })
    );
  };

  //handling edit click and setting todo in setEditTodo state
  const handleEdit = (id) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };

  //jsx for list of todos
  return (
    <div>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "complete" : ""}`}
            onChange={(e) => e.preventDefault()}
          />
          <div>
            <button
              className={`button-complete task-button ${
                todo.completed ? "completed" : ""
              }`}
              onClick={() => handleComplete(todo)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button
              className={`button-edit task-button ${
                todo.completed ? "edit-disabled" : ""
              }`}
              onClick={() => handleEdit(todo.id)}
              disabled={todo.completed}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="fa-solid fa-delete-left"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
