import { useState } from "react";

const Delete = () => {
  // state to hold todo title
  const [id, setId] = useState("");

  // state to hold loading status
  const [loading, setLoading] = useState(false);

  //   state to hold todoTitle error
  const [idError, setIdError] = useState("");

  //   state to hold any error messages to alert user
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    type: "",
  });

  //   function to add todo
  const handleDeleteTodo = async (e) => {
    e.preventDefault();

    // do some validation on id
    if (id === "") {
      setIdError("Id is required");
      return;
    }
    console.log(id);
    try {
      setAlert({ alert: false, message: "", type: "" });
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        if (res.status === 200) {
          // clear form
          setId("");
          setAlert({
            alert: true,
            message: "Todo deleted successfully",
            type: "success",
          });
        } else {
          setAlert({
            alert: true,
            message: "Failed to delete todo",
            type: "danger",
          });
        }
      } else {
        throw new Error("An error occurred while deleting todo");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAlert({ alert: true, message: e.message, type: "danger" });
    }
  };

  return (
    <div
      className="my-3 bg-light shadow rounded p-3 "
      style={{ height: "60vh", position: "relative" }}
    >
      <h1 className="lead border-bottom">Delete Method</h1>

      {/* display if page is loading */}
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          Deleting todo, please wait...
        </div>
      )}

      {/* display alerts to users if there is an error */}
      {alert.alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show d-flex justify-content-center align-items-center`}
          role="alert"
        >
          <strong>{alert.message}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {/* form to get todo title */}
      {!loading && (
        <form className="mt-3" onSubmit={(e) => handleDeleteTodo(e)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="todoTitle"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIdError("");
              }}
              placeholder="Todo Title"
            />
            <label htmlFor="floatingInput">Todo Title</label>
            {idError && <div className="fs-6 text-danger">{idError}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-lg btn-primary w-50">Delete Todo</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Delete;
