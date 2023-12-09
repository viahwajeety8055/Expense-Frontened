import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const currentDate = new Date();
const daysInMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();

let currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();

let prevMonthDay = currentDay;
let prevMonth = currentMonth - 1;

console.log(`${currentDay}   ${currentMonth}`);

const xLabels = Array.from(
  { length: daysInMonth },
  (_, index) => index + 1
).map((day) => {
  return `${currentDate.toLocaleDateString("en-US", {
    month: "short",
  })} ${day}`;
});

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 41100];
// const uData = [100, 200, 300, 400, 500];

export default function SimpleBarChart() {
  return (
    <>
      <h1 className="text-4xl font-bold">Statistics</h1>
      <BarChart
        width={900}
        height={500}
        className="flex justify-center"
        series={[
          { data: pData, label: "pv", id: "pvId" },
          // { data: uData, label: "uv", id: "uvId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </>
  );
}
