import { useLoaderData } from "react-router-dom";
import { getUser } from "../api/users";
import { getPosts } from "../api/posts";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";
import { PostCard } from "../components/PostCard";

function User() {
  const { user, todos, posts } = useLoaderData();
  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>{" "}
        {`${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </div>

      {/* posts */}
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </div>

      {/* todos */}
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              completed={todo.completed}
              title={todo.title}
            />
          );
        })}
      </ul>
    </>
  );
}

// fetching posts,todos and user data, to use up top
// asynch used because you need to wait
async function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts({ params: { userId }, signal });
  const todos = getTodos({ params: { userId }, signal });
  const user = getUser(userId, { signal });

  // they dont depend on each other so no need to split await
  return { posts: await posts, todos: await todos, user: await user };
}

export const userRoute = {
  loader,
  element: <User />,
};
