import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Inventory() {
  const chartData = [
    {
      id: 1,
      title: "Hospital Bag",
      labels: [
        {
          id: 1,
          bgColor: "#005959",
          lebel: "Available",
        },
        {
          id: 2,
          bgColor: "#F3BDB6",
          lebel: "Sold",
        },
        {
          id: 3,
          bgColor: "#E6EFEF",
          lebel: "Total",
        },
      ],
      data: {
        datasets: [
          {
            data: [52, 34, 14],
            backgroundColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      id: 2,
      title: "Postpartum Kit",
      labels: [
        {
          id: 1,
          bgColor: "#005959",
          lebel: "Available",
        },
        {
          id: 2,
          bgColor: "#F3BDB6",
          lebel: "Sold",
        },
        {
          id: 3,
          bgColor: "#E6EFEF",
          lebel: "Total",
        },
      ],
      data: {
        datasets: [
          {
            data: [52, 34, 14],
            backgroundColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      id: 3,
      title: "Perineal Massager",
      labels: [
        {
          id: 1,
          bgColor: "#005959",
          lebel: "Available",
        },
        {
          id: 2,
          bgColor: "#F3BDB6",
          lebel: "Sold",
        },
        {
          id: 3,
          bgColor: "#E6EFEF",
          lebel: "Total",
        },
      ],
      data: {
        datasets: [
          {
            data: [52, 34, 14],
            backgroundColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      id: 4,
      title: "Belly wrap",
      labels: [
        {
          id: 1,
          bgColor: "#005959",
          lebel: "Available",
        },
        {
          id: 2,
          bgColor: "#F3BDB6",
          lebel: "Sold",
        },
        {
          id: 3,
          bgColor: "#E6EFEF",
          lebel: "Total",
        },
      ],
      data: {
        datasets: [
          {
            data: [52, 34, 14],
            backgroundColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderColor: ["#005959", "#F3BDB6", "#E6EFEF"],
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-4 items-center gap-4">
        {chartData?.map((chart) => (
          <div className="border border-blackMid rounded-xl" key={chart?.id}>
            <div className="p-6 border-b border-blackMid">
              <h2 className="text-xl font-semibold text-darkSemi mb-8">
                {chart?.title}
              </h2>
              <Doughnut data={chart?.data} />
            </div>
            <div className="flex items-center gap-2 p-6">
              {chart?.labels?.map((label) => (
                <div className="flex items-center gap-1" key={label?.id}>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `${label?.bgColor}` }}
                  ></div>
                  <p className="text-sm text-blackHigh">{label?.lebel}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Inventory;
