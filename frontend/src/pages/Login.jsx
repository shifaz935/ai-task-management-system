import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUser = async () => {

    try {

      const response = await axios.post(
       "http://127.0.0.1:8000/api/accounts/login/",
        {
          username,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.access
      )
     localStorage.setItem("user_id", response.data.user.id) 

      localStorage.setItem(
        "role",
        response.data.role
      )

      localStorage.setItem("username", username)

      alert("Login Success")
      navigate("/dashboard")

    } catch (error) {
      alert("Invalid Username or Password")
      console.log(error)
    }
  }

   return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div className="card p-5 shadow-lg" style={{ width: "400px" }}>

        <h2 className="text-center mb-4">
          Login
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

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>
        <button
          className="btn btn-link w-100 mt-2"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </button>

      </div>

    </div>
  )
}

export default Login