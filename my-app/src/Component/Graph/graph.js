import { useEffect, useState } from "react";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 41100];
// const uData = [100, 200, 300, 400, 500];

export default function SimpleBarChart() {
  const [token, setToken] = useState("");
  const storedToken = localStorage.getItem("token");
  const [xLabels, setXLables] = useState([]);
  const [pData, setPData] = useState([
    2400, 1398, 9800, 3908, 4800, 3800, 41100,
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/expense?key=welcome`,
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
      console.log(storedToken);
      const result = response.data.result.result;
      const label = result.map((d) => {
        const date = new Date(d.date);
        console.log(d.amount);
        return `${date.getDate()}`;
      });
      const data = result.map((d) => d.amount);
      console.log(data);
      setXLables(label);
      setPData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">Statistics</h1>
      <BarChart
        width={900}
        height={500}
        className="flex justify-center"
        series={[
          { data: pData, label: "Amount", id: "pvId" },
          // { data: uData, label: "uv", id: "uvId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </>
  );
}
