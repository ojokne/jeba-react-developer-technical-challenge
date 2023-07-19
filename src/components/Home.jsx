import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column border-bottom">
        <h1 className="text-muted">Home</h1>
        <p>
          Welcome, choose a method below to view its demonstration. API is
          provided by{" "}
          <a
            href="https://jsonplaceholder.typicode.com"
            className="text-decoration-none"
          >
            JSON placeholder API
          </a>
        </p>
        <div>
          <Link to="/get">
            <button className="btn btn-outline-success m-2">GET</button>
          </Link>
          <Link to="/post">
            <button className="btn btn-outline-warning m-2">POST</button>
          </Link>
          <Link to="/put">
            <button className="btn btn-outline-info m-2">PUT</button>
          </Link>
          <Link to="/delete">
            <button className="btn btn-outline-danger m-2">DELETE</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Home;
