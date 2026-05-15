import { useNavigate } from "react-router-dom"
function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const role = localStorage.getItem("role")
  const logoutUser = () => {

  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("role")

  navigate("/")
}

  return (

    <nav className="navbar navbar-dark bg-dark px-4">

      <div>
        <h5 style={{ color: "white" }}>
          Welcome {username}
        </h5>

        <h3 className="text-white">Task Manager</h3>

        <div className="d-flex gap-2 mt-3">

          {role === "admin" && (
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          )}

          {(role === "admin" || role === "manager") && (
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/projects")}
            >
              Projects
            </button>
          )}

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/tasks")}
          >
            Tasks
          </button>
          <button
             className="btn btn-outline-light me-2"
              onClick={() => navigate("/chatbot")}
          >
            Chatbot
         </button>

          <button
            className="btn btn-danger"
            onClick={logoutUser}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  )
}

export default Navbar