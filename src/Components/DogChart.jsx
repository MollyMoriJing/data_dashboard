import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./DogChart.css";

const DogChart = ({ data }) => {
  const ageCategoryCounts = {};

  data.forEach((animal) => {
    const ageCategory = animal.age;
    ageCategoryCounts[ageCategory] = (ageCategoryCounts[ageCategory] || 0) + 1;
  });

  const ageCategoryData = Object.keys(ageCategoryCounts).map((ageCategory) => ({
    ageCategory,
    count: ageCategoryCounts[ageCategory],
  }));

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Age: ${label}`}</p>
          <p className="tooltip-value">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dog-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={ageCategoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.2)" />
          <XAxis 
            dataKey="ageCategory" 
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
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DogChart;