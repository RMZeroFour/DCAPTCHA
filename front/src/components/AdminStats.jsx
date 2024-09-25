import styles from './AdminStats.module.css';
import React from "react";
import { Chart } from "react-google-charts";

export function AdminStats() {
  const human = 5; // fetch values from backend
  const notSure = 5;
  const bot = 5;

  const data = [
    ["Entity", "Number"],
    ["Human", human],
    ["Not Sure", notSure],
    ["Bot", bot],
  ];
  
  const options = {
    title: "Statistics",
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
