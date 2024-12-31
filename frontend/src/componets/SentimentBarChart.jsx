import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const SentimentBarChart = ({ barChartData }) => {
  if (!barChartData || barChartData.length === 0) {
    return <p>No data available for rendering.</p>;
  }

  return (
    <div className="w-full flex justify-center">
      <div>
        <h2 className="text-red-400 font-semibold mb-4">Sentiment Analysis</h2>
        <BarChart width={600} height={300} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border rounded shadow">
                    <p>
                      <strong>Keywords:</strong> {payload[0].payload.keywords}
                    </p>
                    <p>
                      <strong>Positive:</strong> {payload[0].payload.positive}
                    </p>
                    <p>
                      <strong>Negative:</strong> {payload[0].payload.negative}
                    </p>
                    <p>
                      <strong>Neutral:</strong> {payload[0].payload.neutral}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="positive" fill="#8884d8" name="Positive Sentiment" />
          <Bar dataKey="negative" fill="#82ca9d" name="Negative Sentiment" />
          <Bar dataKey="neutral" fill="#ffc658" name="Neutral Sentiment" />
        </BarChart>
      </div>
    </div>
  );
};

export default SentimentBarChart;



