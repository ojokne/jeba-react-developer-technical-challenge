import { useState } from "react";

const Post = () => {
  // state to hold todo title
  const [todoTitle, setTodoTitle] = useState("");

  // state to hold loading status
  const [loading, setLoading] = useState(false);

  //   state to hold todoTitle error
  const [todoTitleError, setTodoTitleError] = useState("");

  //   state to hold any error messages to alert user
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    type: "",
  });

  //   function to add todo
  const handleAddTodo = async (e) => {
    e.preventDefault();

    // do some validation on todoTitle
    if (todoTitle === "") {
      setTodoTitleError("Todo title is required");
      return;
    }
    try {
      setAlert({ alert: false, message: "", type: "" });
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: todoTitle,
          completed: false,
        }),
      });
      if (res.ok) {
        if (res.status === 201) {
          // clear form
          setTodoTitle("");
          setAlert({
            alert: true,
            message: "Todo added successfully",
            type: "success",
          });
        } else {
          setAlert({
            alert: true,
            message: "Failed to add todo",
            type: "danger",
          });
        }
      } else {
        throw new Error("An error occurred while adding todo");
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
      <h1 className="lead border-bottom">Post Method</h1>

      {/* display if page is loading */}
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          Adding todo, please wait...
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
        <form className="mt-3" onSubmit={(e) => handleAddTodo(e)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="todoTitle"
              value={todoTitle}
              onChange={(e) => {
                setTodoTitle(e.target.value);
                setTodoTitleError("");
              }}
              placeholder="Todo Title"
            />
            <label htmlFor="floatingInput">Todo Title</label>
            {todoTitleError && (
              <div className="fs-6 text-danger">{todoTitleError}</div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-lg btn-primary w-50">Add Todo</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Post;
