/* eslint-disable react/prop-types */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend } from 'recharts';

const SentimentBarChart = ({ barChartData, title }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title} Sentiment Scores</h2>
      <BarChart width={600} height={300} data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <BarTooltip />
        <Bar dataKey="sentimentScore" fill="#8884d8" />
        <BarLegend />
      </BarChart>
    </div>
  );
};

export default SentimentBarChart;

