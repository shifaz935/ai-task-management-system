import TaskChart from "./TaskChart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
function InternDashboard() {
    const navigate = useNavigate()

    const [data, setData] = useState({
        total_projects: 0,
        completed_tasks: 0,
        pending_tasks: 0
    })

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/projects/dashboard/")
        .then((response) => {

            setData(response.data)

        })
        .catch((error) => {

            console.log(error)

        })

    }, [])

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
                Intern Dashboard
            </h1>

            <div className="row">

                <div className="col-md-4">
                    <div className="card p-4 text-center shadow">
                        <h2>Total Projects</h2>
                        <h3>{data.total_projects}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 text-center shadow">
                        <h2>Completed Tasks</h2>
                        <h3>{data.completed_tasks}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 text-center shadow">
                        <h2>Pending Tasks</h2>
                        <h3>{data.pending_tasks}</h3>
                    </div>
                </div>

            </div>
            <TaskChart  completed={data.completed_tasks}
                  pending={data.pending_tasks}
            />

        </div>
    )
}

export default InternDashboard