import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../pages/Register"
import AdminDashboard from "../pages/AdminDashboard"
import ManagerDashboard from "../pages/ManagerDashboard"
import InternDashboard from "../pages/InternDashboard"
import Login from "../pages/Login"
import Projects from "../pages/Projects"
import Tasks from "../pages/Tasks"
import Chatbot from "../pages/Chatbot"

function Dashboard() {
  const role = localStorage.getItem("role")
  if (role === "admin") return <AdminDashboard />
  if (role === "manager") return <ManagerDashboard />
  return <InternDashboard />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes