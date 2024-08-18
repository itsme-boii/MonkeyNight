import * as React from 'react';
import { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts({ data }) {

  const [balanceArray,setBalanceArray] = useState([]);
  const aggregatedData = data.reduce((acc, item) => {
    const date = item.x;
    const balance = Number(item.balance);
    if (!acc[date]) {
        acc[date] = acc[date];
    }
    acc[date] -= balance;
    return acc;
    }, {});

    console.log(aggregatedData);

  const xAxisData = Array.from(new Set(data.map(record => record.x)));
  const seriesData = xAxisData.map(date => ({
    x: date,
    y: data.filter(record => record.x === date) 
  }));
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
        const balances = data.map(item => Number(item.balance));
        setBalanceArray(balances);
        console.log("balance is ", balances); 
    } else {
        console.log('Data is undefined or not an array.');
    }
    }, [data]); 

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: xAxisData, 
          scaleType: 'band',
        },
      ]}
      series={[
        {
          id: 'balanceSeries',
          data: balanceArray,
        },
      ]}
      width={100}
      height={300}
    />
  );
}
