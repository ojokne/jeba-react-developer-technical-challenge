import { useState } from "react";
import { useEffect } from "react";

const Get = () => {
  // state to hold todos
  const [todos, setTodos] = useState([]);

  // state to hold loading status
  const [loading, setLoading] = useState(true);

  //   state to hold any error messages to alert user
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });

  useEffect(() => {
    // function to fetch todos from API
    const fetchTodos = async () => {
      try {
        setAlert({ alert: false, message: "" });
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (res.ok) {
          const data = await res.json();
          setTodos(data);
        } else {
          throw new Error("Failed to fetch data from API");
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setAlert({ alert: true, message: e.message });
      }
    };
    fetchTodos();

    return () => {
      setTodos([]);
    };
  }, []);
  return (
    <div
      className="my-3 bg-light shadow rounded p-3 "
      style={{ height: "60vh", position: "relative" }}
    >
      <h1 className="lead border-bottom">Get Method</h1>
      <div className="overflow-y-scroll p-1" style={{ height: "95%" }}>
        {/* show user that the data is loading */}
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            Fetching todos, please wait
          </div>
        )}

        {/* display alerts to users if there is an error */}
        {alert.alert && (
          <div
            className="alert alert-danger alert-dismissible fade show d-flex justify-content-center align-items-center my-5"
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

        {/* display todos if the data is not loading and there is no error */}

        {!loading && !alert.alert && (
          <div>
            {/* loop through the todos and display the todos */}
            {todos.map((todo, i) => {
              return (
                <div key={i} className="border-bottom p-2">
                  <div className="d-flex">
                    <span className="pe-3">Id: {todo.id}</span>
                    <span className="d-flex align-items-center">
                      Completed:
                      {todo.completed ? (
                        <span>
                          <i className="bi bi-check2 text-success px-3" />
                        </span>
                      ) : (
                        <span>
                          <i className="bi bi-x text-danger px-3" />
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span>{todo.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Get;
