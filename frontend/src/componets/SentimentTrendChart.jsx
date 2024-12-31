/* eslint-disable react/prop-types */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SentimentTrendChart = ({ sentimentData }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Sentiment Trend Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sentimentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pos" stroke="#4caf50" />
          <Line type="monotone" dataKey="neu" stroke="#d4f70f" />
          <Line type="monotone" dataKey="neg" stroke="#f44336" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentTrendChart;
