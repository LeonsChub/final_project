import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const chips = [
  {
    date: new Date().getDate(),
    price: 1200,
  },
  {
    date: new Date().getDate() + 1,
    price: 1600,
  },
  {
    date: new Date().getDate() + 2,
    price: 1000,
  },
  {
    date: new Date().getDate() + 4,
    price: 2200,
  },
  {
    date: new Date().getDate() + 5,
    price: 3000,
  },
  {
    date: new Date().getDate() + 6,
    price: 7000,
  },
  {
    date: new Date().getDate() + 7,
    price: 2200,
  },
];

const labels = chips.map((chip) => chip.date);

export const data = {
  labels,
  datasets: [
    {
      label: "Chips PNL",
      data: chips.map((chip) => chip.price),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function LineChart() {
  return (
    <div className="LineChart">
      <Line options={options} data={data} />
    </div>
  );
}
