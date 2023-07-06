'use client'
import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const RadarChart = ({ name, monthlyAvgActivities }: any) => {
  const labels = monthlyAvgActivities.map((item: any) => item.month)
  const avgActivities = monthlyAvgActivities.map(
    (item: any) => item.avg_activity
  )

  const radarData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Average Activities',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: avgActivities,
      },
    ],
  }

  return (
    <div>
      <h2>{name}</h2>
      <Radar data={radarData} />
    </div>
  )
}

export default RadarChart
