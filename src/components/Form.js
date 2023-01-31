import { useEffect } from "react";
// these function are used to call api in api folder
import { editItem, addItem } from "../api";

//Form component
const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  //updating todo
  const updateTodo = async (title, id, completed, userId) => {
    // calling editItem function to update data in server using Api
    let result = await editItem({ title, id, completed, userId });
    if (result === 500) {
      console.log("Internal server error");
      return;
    }
    // getting new Array of todos after updating and updating local Storage
    const newTodo = todos.map((todo) =>
      todo.id === result.id ? result : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    // setting title in setInput if editTodo have todo
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  // handling submit of the form
  const onFormSubmit = async (event) => {
    event.preventDefault();

    //if editTodo have todo then update else create new todo
    if (!editTodo) {
      const result = await addItem(input);
      setTodos([...todos, result]);
      // console.log(result);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed, editTodo.userId);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button className="button-add" type="submit">
        {editTodo ? "Edit" : "Add"}
      </button>
    </form>
  );
};
export default Form;
