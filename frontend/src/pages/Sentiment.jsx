
import { useState } from "react";
import SentimentForm from "../componets/SentimentForm";
import SentimentPieChart from "../componets/SentimentPieChart";
import SentimentBarChart from "../componets/SentimentBarChart";
import SentimentDisplay from "../componets/SentimentDisplay";
import SentimentTrendChart from "../componets/SentimentTrendChart";
function Sentiment() {
  const [sentiments, setSentiments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = (analysis) => {
    setSentiments(analysis);
  };

  
  const sentimentData = [
    {
      name: "Positive",
      value: sentiments.filter((s) => s.post_sentiment.pos > 0).length,
      fill: "#4caf50",
    },
    {
      name: "Neutral",
      value: sentiments.filter((s) => s.post_sentiment.neu > 0).length,
      fill: "#ffeb3b",
    },
    {
      name: "Negative",
      value: sentiments.filter((s) => s.post_sentiment.neg > 0).length,
      fill: "#f44336",
    },
  ];

  // const barChartData = sentiments.map((post) => ({
  //   name: post.title,
  //   sentimentScore: post.post_sentiment.compound,
  // }));

  const barChartData = sentiments.map((post, index) => ({
    name: post.title || `Post ${index + 1}`,
    positive: post.post_sentiment.pos || 0,
    negative: post.post_sentiment.neg || 0,
    neutral: post.post_sentiment.neu || 0,
    keywords: post.post_keywords?.join(", ") || "No keywords",
  }));

  console.log(sentiments);
  const formattedSentimentData = sentiments.map((sentiment, index) => ({
    index: index + 1,
    pos: sentiment.post_sentiment.pos,
    neu: sentiment.post_sentiment.neu,
    neg: sentiment.post_sentiment.neg,
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white bg-red-600 w-10/12 text-center py-2 rounded-xl shadow-xl mb-10">
        Reddit Sentiment Analyzer
      </h1>

      
      <div className="w-full max-w-2xl px-4">
        <SentimentForm onAnalyze={handleAnalysis} setLoading={setLoading} />
      </div>

      {loading ? (
        <span className="mt-4 loading loading-spinner loading-lg my-12 mb-6"></span>
      ) : (
        <div className="w-full max-w-4xl mt-10 px-4 mr-40">
          {sentiments.length > 0 ? (
            <div className="space-y-10">
            
              <SentimentPieChart
                sentimentData={sentimentData}
                title="Overall"
              />

              <SentimentBarChart barChartData={barChartData} title="Overall" />
              <SentimentTrendChart sentimentData={formattedSentimentData} />
              <div className="bg-red-100 p-4 rounded-lg shadow-lg border-2 border-red-500">
                <h1 className="text-red-800 font-semibold">
                  Click on a post to explore detailed stats about its content,
                  comments, and extracted keywords.
                </h1>
              </div>

              <SentimentDisplay sentiments={sentiments} />
            </div>
          ) : (
            <p className="text-center text-gray-500 m-12">
              Enter a valid subreddit to see sentiment analysis. 
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Sentiment;
