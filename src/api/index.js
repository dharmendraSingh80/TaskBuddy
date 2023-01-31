//get todos from the api
export const getItems = async () => {
  let result = await fetch("https://jsonplaceholder.typicode.com/todos");
  result = await result.json();
  return result;
};

//editing the todo using api
export const editItem = async (body) => {
  let result = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${body.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        ...body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (result.status === 500) {
    return 500;
  }
  result = await result.json();
  return result;
};

//adding new todo using api into the server
export const addItem = async (title) => {
  let result = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "post",
    body: JSON.stringify({
      title,
      userId: 11,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await result.json();
};

//deleting the todo from the server
export const deleteItem = async (id) => {
  let result = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  return result;
};

// toggle the todo is completed or not using api
export const toggleComplete = async (todo) => {
  let result = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (result.status === 500) {
    return 500;
  }
  return await result.json();
};
