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

  const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export const options = {
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  barThickness: 12,

  plugins: {
    legend: {
      display: false,
    },

    // title: {
    //   display: true,
    //   text: 'Chart.js Horizontal Bar Chart',
    // },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function HorizontalBarTest() {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const data = {
      labels: labels,
      datasets: [
        {
          //  label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
        height: labels.length < 20 ? "100%" : labels.length * 20,
      }}
    >
      <Chart
        ref={chartRef}
        options={options}
        type="bar"
        data={chartData}
        // height={}
        className={`   w-full `}
      />
    </div>
  );
}
