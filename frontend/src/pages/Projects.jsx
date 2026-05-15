import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

function Projects() {

  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/")
    }

  }, [])

  useEffect(() => {
    getProjects()
  }, [])

  const getProjects = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(

        "http://127.0.0.1:8000/api/projects/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)

      setProjects(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  const addProject = async () => {

    try {
      await axios.post("http://127.0.0.1:8000/api/projects/", {
        title: title,
        description: description,
        user: 1
      })

      alert("Project Added")

      setTitle("")
      setDescription("")

      getProjects()
    } catch (error) {
      console.log(error)
    }
  }
    const deleteProject = async (id) => {

    try {

        await axios.delete(
            `http://127.0.0.1:8000/api/projects/delete-project/${id}/`
        )

        getProjects()

    } catch (error) {

        console.log(error)

    }

}
    const updateProject = async () => {
      const token = localStorage.getItem("token")

      await axios.put(
        `http://127.0.0.1:8000/api/projects/update-project/${editId}/`,
        {
          title: editTitle,
          description: editDescription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Project Updated")

      getProjects()

      setEditId(null)
      setEditTitle("")
      setEditDescription("")
    }
  return (
  
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        padding: "50px"
      }}
    >

      <Navbar />

      <h1 className="text-center text-white mb-5">
        Projects
      </h1>

      <div className="card p-4 mb-5">

        <input
          type="text"
          placeholder="Project Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={addProject}
        >
          Add Project
        </button>

      </div>
      <div className="row">

        {projects.map((project) => (

          <div className="col-md-4 mb-4">

            <div className="card p-4 shadow">

              <h3>{project.title}</h3>

              <p>{project.description}</p>
              <button
                className="btn btn-danger"
                onClick={() => deleteProject(project.id)}
              >
                Delete 
              </button>

              <button
                className="btn btn-warning w-100"
                onClick={() => {
                  setEditId(project.id)
                  setEditTitle(project.title)
                  setEditDescription(project.description)
                }}
              >
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

      {
        editId && (

          <div className="card p-4 mt-4">

            <h3>Edit Project</h3>

            <input
              type="text"
              className="form-control mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <button
              className="btn btn-success"
              onClick={updateProject}
            >
              Update
            </button>

          </div>

        )
      }

    </div>
  )
}

export default Projects