import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("intern")

  const navigate = useNavigate()

  const registerUser = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          username,
          password,
          role: role
        }
      )

      alert("Registration Successful")

      navigate("/")

    } catch (error) {

     console.log(error)

      alert(
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Registration Failed"
  )
}
}

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div
        className="card p-5 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      >

        <h2 className="text-center mb-4">
          Register
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control mb-3"
          onChange={(e) => setRole(e.target.value)}
        >

          <option value="intern">
            Intern
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          className="btn btn-success w-100"
          onClick={registerUser}
        >
          Register
        </button>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => navigate("/")}
        >
          Go To Login
        </button>

      </div>

    </div>
  )
}

export default Register