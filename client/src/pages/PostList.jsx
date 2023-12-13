import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";

function PostList() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getPosts({ signal });
}

// group both function into a object so you can spread them inside router
export const postListRoute = {
  loader,
  element: <PostList />,
};
