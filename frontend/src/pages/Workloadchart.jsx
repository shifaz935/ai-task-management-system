import { useEffect, useState } from "react"
import axios from "axios"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function WorkloadChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/projects/workload/")
      .then((response) => {

        const labels = response.data.map(
          item => item.assigned_user__username
        )

        const counts = response.data.map(
          item => item.task_count
        )

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Tasks Assigned",
              data: counts,
              backgroundColor: [
                "blue",
                "green",
                "orange",
                "purple",
                "red"
              ]
            }
          ]
        })

      })

  }, [])

  return (

    <div
      style={{
        width: "70%",
        margin: "40px auto",
        background: "white",
        padding: "20px",
        borderRadius: "15px"
      }}
    >

      <h3 className="text-center mb-4">
        Workload Distribution
      </h3>

      <Bar data={chartData} />

    </div>

  )
}

export default WorkloadChart