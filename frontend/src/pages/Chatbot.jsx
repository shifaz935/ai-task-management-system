
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Chatbot() {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const [darkMode, setDarkMode] = useState(true)

    const user_id = localStorage.getItem("user_id")

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/api/chatbot/history/${user_id}/`
        )
        .then((response) => {

            setMessages(response.data)

        })

    }, [])

    const sendMessage = () => {

        if (message.trim() === "") return

        setLoading(true)

        axios.post(
            "http://127.0.0.1:8000/api/chatbot/ask/",
            {
                message: message,
                user_id: user_id
            }
        )
        
.then((response) => {

    const fullReply = response.data.reply

    const tempChat = {
        message: message,
        response: ""
    }

    setMessages(prev => [...prev, tempChat])

    let index = 0

    const interval = setInterval(() => {

        index++

        setMessages(prev => {

            const updated = [...prev]

            updated[updated.length - 1].response =
                fullReply.slice(0, index)

            return [...updated]

        })

        if (index >= fullReply.length) {

            clearInterval(interval)

        }

    }, 20)

    setMessage("")

    setLoading(false)

})


    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: darkMode ? "#0f172a" : "#f1f5f9",
                color: darkMode ? "white" : "black",
                padding: "30px"
            }}
        >

            <Navbar />

            <div className="text-end mb-3">

                <button
                    className="btn btn-warning"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {
                        darkMode
                        ? "Light Mode"
                        : "Dark Mode"
                    }
                </button>

            </div>

            <h1 className="text-center mb-4">
                AI Chatbot
            </h1>
         <div className="text-center mb-3">

    <a
        href={`http://127.0.0.1:8000/api/chatbot/download/${user_id}/`}
        className="btn btn-success"
    >
        Download Chat PDF
    </a>

</div>



            <div
                style={{
                    maxWidth: "800px",
                    margin: "auto",
                    background: darkMode ? "#1e293b" : "white",
                    padding: "20px",
                    borderRadius: "15px",
                    height: "70vh",
                    overflowY: "auto"
                }}
            >

                {
                    messages.map((chat, index) => (

                        <div key={index}>

                            <div
                                style={{
                                    textAlign: "right",
                                    marginBottom: "10px"
                                }}
                            >
                                <span
                                    style={{
                                        background: darkMode
                                            ? "#2563eb"
                                            : "#3b82f6",

                                        padding: "10px",
                                        borderRadius: "10px",
                                        display: "inline-block",
                                        color: "white"
                                    }}
                                >
                                    {chat.message}
                                </span>
                            </div>

                            <div
                                style={{
                                    textAlign: "left",
                                    marginBottom: "20px"
                                }}
                            >
                                <span
                                    style={{
                                        background: darkMode
                                            ? "#334155"
                                            : "#cbd5e1",

                                        padding: "10px",
                                        borderRadius: "10px",
                                        display: "inline-block"
                                    }}
                                >
                                    {chat.response}
                                </span>
                            </div>

                        </div>

                    ))
                }

                {
                    loading && (
                        <p>AI is typing...</p>
                    )
                }

            </div>

            <div
                style={{
                    maxWidth: "800px",
                    margin: "20px auto",
                    display: "flex",
                    gap: "10px"
                }}
            >

                <input
                    type="text"
                    className="form-control"
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>

    )
}

export default Chatbot

