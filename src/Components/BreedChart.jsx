import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./BreedChart.css";

const BreedChart = ({ data }) => {
  // Convert data object to array format for Recharts
  const chartData = Object.entries(data).map(([breed, count]) => ({
    breed,
    count,
    percentage: ((count / Object.values(data).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }));

  // Color palette for the pie chart
  const COLORS = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#fa709a', '#fee140',
    '#a8edea', '#fed6e3', '#d299c2', '#fef9d7'
  ];

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="breed-tooltip">
          <p className="tooltip-breed">{data.breed}</p>
          <p className="tooltip-count">{`Count: ${data.count}`}</p>
          <p className="tooltip-percentage">{`${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    if (percentage < 5) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const customLegendFormatter = (value, entry) => {
    return (
      <span style={{ color: entry.color, fontSize: '12px' }}>
        {entry.payload.breed} ({entry.payload.count})
      </span>
    );
  };

  return (
    <div className="breed-chart-container">
      <div className="chart-info">
        <h3>🏆 Most Popular Breeds</h3>
        <p>Distribution of dog breeds available for adoption</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={customLegendFormatter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreedChart