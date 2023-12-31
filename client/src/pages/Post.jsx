import { Link, useLoaderData } from "react-router-dom";
import { getPost } from "../api/posts";
import { getComments } from "../api/comments";
import { getUser } from "../api/users";

function Post() {
  const { post, user, comments } = useLoaderData();
  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => {
          return (
            <div className="card" key={comment.id}>
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// fetching post, comments, and user data to use up top
// async is used to wait
async function loader({ request: { signal }, params: { postId } }) {
  const post = await getPost(postId, { signal });
  const comments = getComments(postId, { signal });
  const user = getUser(post.userId, { signal });

  // post has await up to so it loads first
  // await is split so that comments and users get loaded at once
  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};
