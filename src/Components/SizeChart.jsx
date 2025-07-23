import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./SizeChart.css";

const SizeChart = ({ data }) => {
  const sizeCategoryCounts = {};

  data.forEach((animal) => {
    const sizeCategory = animal.size || "Unknown";
    sizeCategoryCounts[sizeCategory] = (sizeCategoryCounts[sizeCategory] || 0) + 1;
  });

  // Define the order of sizes from smallest to largest
  const sizeOrder = ["Small", "Medium", "Large", "Extra Large", "Unknown"];
  
  const sizeCategoryData = sizeOrder
    .filter(size => sizeCategoryCounts[size]) // Only include sizes that have data
    .map((sizeCategory) => ({
      sizeCategory,
      count: sizeCategoryCounts[sizeCategory],
    }));

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="size-tooltip">
          <p className="tooltip-label">{`Size: ${label}`}</p>
          <p className="tooltip-value">{`Count: ${payload[0].value}`}</p>
          <p className="tooltip-percentage">
            {`${((payload[0].value / data.length) * 100).toFixed(1)}% of total`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="size-chart-container">
      <div className="chart-info">
        <h3>📏 Dog Size Distribution</h3>
        <p>Distribution of dog sizes available for adoption</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sizeCategoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.2)" />
          <XAxis 
            dataKey="sizeCategory" 
            stroke="#666"
            fontSize={12}
            fontWeight="500"
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            fontWeight="500"
          />
          <Tooltip content={customTooltip} />
          <Bar 
            dataKey="count" 
            fill="url(#sizeGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="sizeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SizeChart;