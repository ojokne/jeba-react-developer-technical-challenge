import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Home";
import Get from "./components/Get";
import Post from "./components/Post";
import Put from "./components/Put";
import Delete from "./components/Delete";

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="get" element={<Get />} />
          <Route path="post" element={<Post />} />
          <Route path="put" element={<Put />} />
          <Route path="delete" element={<Delete />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
