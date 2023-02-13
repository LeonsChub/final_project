import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Winnings", "Loses"],
  datasets: [
    {
      title: "Poker stats",
      label: "Game results",
      data: [12, 9],
      backgroundColor: ["#ffbf00", "rgba(176, 0, 0, 0.858)"],
      borderColor: ["#000", "#000"],
      borderWidth: 1.5,
    },
  ],
};

export function PieChart() {
  return <Pie data={data} />;
}