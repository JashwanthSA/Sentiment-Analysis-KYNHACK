/* eslint-disable react/prop-types */
import { useState } from "react";
import SentimentPieChart from "./SentimentPieChart";
import SentimentBarChart from "./SentimentBarChart";
import ReactMarkdown from "react-markdown";

const SentimentDisplay = ({ sentiments }) => {
  // State to hold the selected post
  const [selectedPost, setSelectedPost] = useState(null);

  // Function to handle post click
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // If a post is selected, display the post details and comments
  if (selectedPost) {
    return (
      <div>
        <button
          onClick={() => setSelectedPost(null)}
          className="text-blue-500 mb-4 inline-block"
        >
          Back to posts list
        </button>

        <div className="mb-6 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedPost.title}
          </h3>
          <ReactMarkdown className="text-gray-600">
            {selectedPost.selftext || "No description available."}
          </ReactMarkdown>

          {/* Sentiment Analysis for the Post */}
          <SentimentPieChart
            sentimentData={[
              {
                name: "Positive",
                value: selectedPost.post_sentiment.pos,
                fill: "#4caf50",
              },
              {
                name: "Neutral",
                value: selectedPost.post_sentiment.neu,
                fill: "#ffeb3b",
              },
              {
                name: "Negative",
                value: selectedPost.post_sentiment.neg,
                fill: "#f44336",
              },
            ]}
            title={selectedPost.title}
          />
          <SentimentBarChart
            barChartData={[
              {
                name: "Positive",
                sentimentScore: selectedPost.post_sentiment.pos,
              },
              {
                name: "Neutral",
                sentimentScore: selectedPost.post_sentiment.neu,
              },
              {
                name: "Negative",
                sentimentScore: selectedPost.post_sentiment.neg,
              },
            ]}
            title={selectedPost.title}
          />
          {selectedPost.post_keywords && (
            <div className="mt-4">
              <strong>Post Keywords:</strong>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedPost.post_keywords.map((keyword, index) => (
                  <ReactMarkdown key={index}>{keyword}</ReactMarkdown>
                ))}
              </ul>
            </div>
          )}
          {selectedPost.comment_keywords && (
            <div className="mt-4">
              <strong>Comment Keywords:</strong>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedPost.comment_keywords.map((keyword, index) => (
                  <ReactMarkdown key={index}>{keyword}</ReactMarkdown>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-2">
            <strong>Sentiment Score:</strong>{" "}
            {selectedPost.post_sentiment.compound}
          </div>

          <h4 className="mt-4 text-lg font-semibold text-gray-700">Comments</h4>
          <ul className="mt-2">
            {selectedPost.comments?.length > 0 ? (
              selectedPost.comments.map((comment, index) => (
                <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
                  <p className="text-gray-800">{comment.comment}</p>

                  {/* Sentiment Analysis for the Comment */}
                  <div className="mt-2">
                    <ReactMarkdown className="text-sm text-gray-600">
                      Sentiment for this comment:
                    </ReactMarkdown>
                    <SentimentBarChart
                      barChartData={[
                        {
                          name: "Positive",
                          sentimentScore: comment.sentiment.pos,
                        },
                        {
                          name: "Neutral",
                          sentimentScore: comment.sentiment.neu,
                        },
                        {
                          name: "Negative",
                          sentimentScore: comment.sentiment.neg,
                        },
                      ]}
                      title={`Sentiment for Comment ${index + 1}`}
                    />
                    <p className="text-sm mt-2">
                      Positive: {comment.sentiment.pos}
                    </p>
                    <p className="text-sm">Neutral: {comment.sentiment.neu}</p>
                    <p className="text-sm">Negative: {comment.sentiment.neg}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No comments available.</p>
            )}
          </ul>
        </div>
      </div>
    );
  }

  // If no post is selected, display the list of posts
  return (
    <div>
      {sentiments.map((post, index) => {
        const postSentimentData = [
          { name: "Positive", value: post.post_sentiment.pos, fill: "#4caf50" },
          { name: "Neutral", value: post.post_sentiment.neu, fill: "#ffeb3b" },
          { name: "Negative", value: post.post_sentiment.neg, fill: "#f44336" },
        ];

        const postBarChartData = [
          { name: "Positive", sentimentScore: post.post_sentiment.pos },
          { name: "Neutral", sentimentScore: post.post_sentiment.neu },
          { name: "Negative", sentimentScore: post.post_sentiment.neg },
        ];

        return (
          <div
            key={index}
            className="mb-6 p-4 bg-white rounded shadow-md cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h3>
            <ReactMarkdown className="text-gray-600">
              {post.selftext || "No description available."}
            </ReactMarkdown>

            {/* Sentiment Analysis for the Post */}
            <SentimentPieChart
              className="mt-[20px] "
              sentimentData={postSentimentData}
              title={post.title}
            />
            <SentimentBarChart
              barChartData={postBarChartData}
              title={post.title}
            />

            <div className="mt-2">
              <strong className="text-red-600">Sentiment Score:</strong> <span className="text-bold">{post.post_sentiment.compound}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SentimentDisplay;
