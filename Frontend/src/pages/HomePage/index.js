import React from "react";
import AlertCT from "../../components/AlertCT";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Số lượng index tạo trong tháng",
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Kích thước index",
    },
  },
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const labels2 = [
  "event 1",
  "event 2",
  "event 3",
  "event 4",
  "event 5",
  "event 6",
  "event 7",
  "event 8",
  "event 9",
  "event 10",
  "event 11",
  "event 12",
];
const data = {
  labels,
  datasets: [
    {
      label: "Số lượng index đã tạo",
      data: [10, 21, 33, 14, 45, 26, 17, 58, 29, 11, 21, 52],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const data2 = {
  labels,
  datasets: [
    {
      label: "Kích thước index",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      backgroundColor: "rgba(44, 121, 11, 0.5)",
    },
  ],
};

function HomePage(props) {
  return (
    <>
      <h1>Thống kê số liệu</h1>
      <div style={{ width: "48%" }}>
        <Line options={options} data={data} />

        <Bar options={options2} data={data2} />
      </div>
    </>
  );
}

export default HomePage;
