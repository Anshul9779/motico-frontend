import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "./components/Card/Card";
import { callAnalyticsCummulated } from "./utils/api";

// const data = {
//   labels: ["1", "2", "3", "4", "5", "6"],
//   datasets: [
//     {
//       label: "Total Outbound Calls",
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgba(255, 99, 132, 0.2)",
//     },
//     {
//       label: "Total Missed Calls",
//       data: [19, 11, 32, 51, 21, 33],
//       fill: false,
//     },
//     {
//       label: "Total Inbound Calls",
//       data: [2, 1, 12, 51, 10, 3],
//       fill: false,
//     },
//   ],
// };

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function Analytics() {
  const [data, setData] = useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Total Outbound Calls",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Missed Calls",
        data: [19, 11, 32, 51, 21, 33],
        fill: false,
      },
      {
        label: "Total Inbound Calls",
        data: [2, 1, 12, 51, 10, 3],
        fill: false,
      },
    ],
  });
  useEffect(() => {
    callAnalyticsCummulated().then((apiData) => {
      const labels = apiData.map((d) => d.label);
      const inbound = apiData.map((d) => d.inbound);
      const outgoing = apiData.map((d) => d.outgoing);
      const missed = apiData.map((d) => d.missed);
      setData({
        labels,
        datasets: [
          {
            label: "Total Outbound Calls",
            data: outgoing,
            fill: false,
            backgroundColor: "rgb(110, 55, 110)",
            borderColor: "rgba(110, 55, 110, 0.2)",
          },
          {
            label: "Total Inbound Calls",
            data: inbound,
            fill: false,
            backgroundColor: "rgb(255,157,130)",
            borderColor: "rgba(255,157,130, 0.2)",
          },
          {
            label: "Total Missed Calls",
            data: missed,
            fill: false,
            backgroundColor: "rgb(201,75,123)",
            borderColor: "rgba(201,75,123, 0.2)",
          },
        ],
      });
    });
  }, []);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ backgroundColor: "white", paddingLeft: "1.5rem" }}>
        <div
          style={{
            padding: "0 1.2rem 0.8rem 1.2rem",
            borderBottom: "5px solid #2B3144",
            width: "fit-content",
            cursor: "pointer",
            color: "#6C7A81",
          }}
        >
          Analytics
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, gap: "1.5em", padding: "2rem" }}>
        <Card style={{ minHeight: 300, width: "100%" }}>
          <Card.Body
            style={{
              minHeight: 300,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0.5em",
            }}
          >
            <Line type="line" height={70} data={data} options={options} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
