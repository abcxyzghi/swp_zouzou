import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import './Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [dataAdultSet] = useState([]);
  const [dataChildSet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = "https://zouzoumanagement.xyz/api/v1/ticket";
      const labelSet = new Set();
      try {
        const response = await fetch(API_URL);
        const res = await response.json();
        
        console.log("API data", res);
        const first10Record = res.slice(0,10);
        for (const check of first10Record) {
            const date = check.date;
          if (check.type === "ADULT") {
            dataAdultSet.push(check.quantity);
          }
          if (check.type === "CHILD") {
            dataChildSet.push(check.quantity);
          }

          labelSet.add(date);
          
        }

        const labels = Array.from(labelSet);
  
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Adult",
              data: dataAdultSet,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Child",
              data: dataChildSet,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
  
        console.log("Data - Adults:", dataAdultSet);
        console.log("Data - Children:", dataChildSet);
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    fetchData();
  }, []);

  
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Ticket Statistic Chart By Day",
      },
    },
  };
  return (
    <div className="bar-chart-style">
      {dataAdultSet.length > 0 && dataChildSet.length > 0 && (
        <Bar data={chartData} height={400} options={options} />
      )}
    </div>
  );
};

export default BarChart;
