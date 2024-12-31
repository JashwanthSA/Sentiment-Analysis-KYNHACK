/* eslint-disable react/prop-types */

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const SentimentPieChart = ({ sentimentData, title }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title} Sentiment Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={sentimentData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {sentimentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SentimentPieChart;

