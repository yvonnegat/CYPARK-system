import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ParkingStatus = ({ totalSpots, occupiedSpots }) => {
  const vacantSpots = totalSpots - occupiedSpots;
  const data = [
    { name: 'Occupied', value: occupiedSpots },
    { name: 'Vacant', value: vacantSpots }
  ];

  const COLORS = ['#FF0000', '#00FF00']; // Red for occupied, Green for vacant

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ParkingStatus;
