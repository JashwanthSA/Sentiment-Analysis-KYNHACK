/* eslint-disable react/prop-types */
import  { useState } from "react";
import axios from "axios";

const SentimentForm = ({ onAnalyze,setLoading }) => {
  const [subreddit, setSubreddit] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);
    if (!subreddit.trim()) {
      setError("Subreddit cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        subreddit,
      });
      setLoading(false);
      onAnalyze(response.data);
    } catch (error) {
      setError("Failed to fetch sentiment analysis. Please try again.");
      console.error("Error fetching sentiment analysis:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
        Reddit Sentiment Analyzer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="subreddit">
            Enter Subreddit:
          </label>
          <input
            id="subreddit"
            type="text"
            placeholder="e.g., ReactJS"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 focus-within:bg-slate-200 font-semibold border-slate-900"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-red-500 rounded-lg shadow transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Analyze
          </button>
        </div>
      </form>
    </div>
  );
};

export default SentimentForm;
