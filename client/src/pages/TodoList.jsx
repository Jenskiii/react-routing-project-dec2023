import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";

export function TodoList() {
  const todos = useLoaderData();
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem key={todo.id} {...todo}/>
          );
        })}
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return getTodos({ signal });
}

// group both function into a object so you can spread them inside router
export const todoListRoute = {
  loader,
  element: <TodoList />,
};
