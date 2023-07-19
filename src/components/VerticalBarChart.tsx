"use client";
import React, { useRef, useEffect, useState } from "react";
import type { ChartData, ChartArea } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  Title,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = "#163143";
  const colorMid = "#69C920";
  const colorEnd = "#69C920";
  //  const colorStart = '#163143'
  // const colorMid = '#698CA4'
  //  const colorEnd = '#698CA4'

  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}
const defaultLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function VerticalBartChartTest() {
  const chartRef = useRef<ChartJS>(null);

  const options = {
    barThickness: defaultLabels.length < 500 ? 50 : 10,

    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const data = {
      labels: defaultLabels,
      datasets: [
        {
          //  label: 'Dataset 1',
          data: defaultLabels.map(() =>
            faker.datatype.number({ min: 0, max: 1000 })
          ),
        },
        // {
        //   label: 'Dataset 2',
        //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // },
      ],
    };

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <div
      style={{
        width: defaultLabels.length < 500 ? "100%" : defaultLabels.length * 20,
      }}
      className="mx-auto h-[450px] pt-12 "
    >
      <Chart
        ref={chartRef}
        options={options}
        type="bar"
        data={chartData}
        // width={defaultLabels.length * 10}
        height={"100%"}
        className={` `}
      />
    </div>
  );
}
