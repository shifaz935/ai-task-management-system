import { useEffect, useState , useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
function Tasks() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const [assignedUser, setAssignedUser] = useState("")

  const [deadline, setDeadline] = useState("")

  const [status, setStatus] = useState("Pending")

  const [project, setProject] = useState("")

  const [projects, setProjects] = useState([])

  const [users, setUsers] = useState([])
  
  const socketRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/")
    }
  }, [])

 useEffect(() => {

    fetchTasks()

    socketRef.current = new WebSocket(
      "ws://localhost:8000/ws/tasks/"
    )

    socketRef.current.onmessage = () => {
      fetchTasks()
    }

    return () => {
      socketRef.current.close()
    }

}, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects/")
    .then((response) => {
        setProjects(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects/users/")
    .then((response) => {
        setUsers(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  }, [])


  const fetchTasks = () => {
    axios.get("http://127.0.0.1:8000/api/projects/tasks/")
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const addTask = () => {

    axios.post("http://127.0.0.1:8000/api/projects/tasks/", {
      title,
      description,
      status,
      project,
      assigned_user: assignedUser,
      deadline
    })

    .then((response) => {

      alert("Task Added")

      fetchTasks()

      setTitle("")

      setDescription("")

      setStatus("Pending")

    })

    .catch((error) => {
      console.log(error)
    })
  }
   const deleteTask = (id) => {

     axios.delete(`http://127.0.0.1:8000/api/projects/delete-task/${id}/`)

    .then((response) => {

      alert("Task Deleted")

      fetchTasks()

    })

    .catch((error) => {
      console.log(error)
    })
}
   const updateTask = (id) => {

     axios.put(`http://127.0.0.1:8000/api/projects/update-task/${id}/`)

    .then((response) => {

      alert("Task Updated")
      fetchTasks()

      socketRef.current.send(
       JSON.stringify({
         message: "task updated"
     })
  )
    })

    .catch((error) => {
      console.log(error)
    })
      
} 
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        padding: "40px",
        color: "white"
      }}
    >
      <Navbar />

      <h1 className="text-center mb-5">Tasks</h1>


      <div className="card p-4 mb-5">

        <select
          className="form-control mb-3"
          onChange={(e) => setProject(e.target.value)}
        >
          <option>Select Project</option>

          {projects.map((item) => (
            <option value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Task Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Enter Task Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          className="form-control mb-3"
          onChange={(e) => setAssignedUser(e.target.value)}
        >

          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}

        </select>

        <input
          type="date"
          className="form-control mb-3"
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>


      <div className="row">

        {tasks.map((task) => (

          <div className="col-md-4 mb-4" key={task.id}>

            <div className="card p-3 shadow">

              <h4>{task.title}</h4>

              <p>{task.description}</p>

              <p>Project: {task.project_name}</p>

              <p>
                Assigned To: {task.assigned_username}
              </p>

              <p>
                Deadline: {task.deadline}
              </p>

              <div
                style={{
                  backgroundColor:
                    task.status === "Completed"
                      ? "green"
                      : "orange",
                  color: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}
              >
                {task.status}
              </div>

              <button
                className="btn btn-success me-2"
                onClick={() => updateTask(task.id)}
              >
                Update Status
                </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Tasks