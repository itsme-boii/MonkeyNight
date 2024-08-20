// import * as React from 'react';
import { useState, useEffect } from "react";
// import { BarChart } from '@mui/x-charts/BarChart';
// import { format } from 'date-fns';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function SimpleCharts({data}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Convert data to a format with timestamp as Date object
      const formattedData = data.map(item => ({
        date: new Date(Number(item.timestamp) * 1000).toLocaleDateString(),
        balance: Number(item.balance),
      }));

      // Set the chart data
      setChartData(formattedData);
      console.log(formattedData)
    } else {
      console.log('Data is undefined or not an array.');
    }
  }, [data]);

  console.log("chartdata is",chartData);

  // Extract unique dates for x-axis
  const uniqueDates = Array.from(new Set(chartData.map(d => d.date)));

//   return (
//     <BarChart
//       xAxis={[
//         {
//           id: 'barCategories',
//           data: uniqueDates,
//           scaleType: 'band',
//           barGapRatio: 2
//         },
//       ]}
//       series={[
//         {
//           id: 'balanceSeries',
//           data: chartData,
//           xField: 'date', // X-axis field
//           yField: 'balance' // Y-axis field
//         },
//       ]}
//       width={230}
//       height={250}
//     />
//   );
// }

const dataa = chartData;

// const monthTickFormatter = (tick) => {
//   const date = new Date(tick);

//   return date.getMonth() + 1;
// };

const renderQuarterTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;
  const isMidMonth = month % 3 === 1;

  if (month % 3 === 1) {
    return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return null;
};

  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataa}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0 3" />
          <XAxis dataKey="date"  />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderQuarterTick}
            height={1}
            scale="band"
            xAxisId="quarter"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="balance" fill="#854CE6" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

