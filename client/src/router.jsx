import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { postListRoute } from "./pages/PostList";
import { postRoute } from "./pages/Post";
import { todoListRoute } from "./pages/TodoList";
import { userListRoute } from "./pages/UserList";
import { userRoute } from "./pages/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 1st child is error message, so when any child has an error it will render error
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            // POSTS
            path: "posts",
            children: [
              // ...postListRoute contains: loader and element,  that is divined inside PostList.jsx
              // this cleans up the code inside this file
              { index: true, ...postListRoute },
              { path: ":postId", ...postRoute },
            ],
          },
          {
            // USERS
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          //  TODOS
          { path: "todos", ...todoListRoute },
          // shows error if url doenst excist
          { path: "*", element: <h1>404 - Page Not Found</h1> },
        ],
      },
    ],
  },
]);

function ErrorPage(){
  const error = useRouteError()

  return <>
  <h1>Error - Something went wrong</h1>
  
  {/* shows error message when in development */}
  {import.meta.env.MODE !== "production" && (
    <>
    <pre>{error.message}</pre>
    <pre>{error.stack}</pre>
    </>
  )}
  </>
}