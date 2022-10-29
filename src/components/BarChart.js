import { Bar } from "react-chartjs-2";
function BarChart({ chartData }) {
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
