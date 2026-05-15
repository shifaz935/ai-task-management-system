import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import WorkloadChart from "./WorkloadChart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function TaskChart({ completed, pending }) {

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["green", "orange"],
      },
    ],
  };

  const barData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
        backgroundColor: ["green", "orange"],
      },
    ],
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <h2 style={{ color: "white" }}>
        Task Completion Analytics
      </h2>

      <div
        style={{
          display: "flex",
          gap: "50px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "300px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Pie data={pieData} />
        </div>

        <div
          style={{
            width: "400px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default TaskChart;
<WorkloadChart/>