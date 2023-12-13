import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";

export function RootLayout() {
  const { state } = useNavigation();
  // to check if page is loading
  const isLoading = state === "loading"

  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <ul className="nav-list">
          <li>
            <Link to="posts">Posts</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <Link to="todos">Todos</Link>
          </li>
        </ul>
      </nav>
      {/* will put scroll automaticly on top of page */}
      {/* this wont happen naturally if you have alot of content */}
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner"></div>}
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
