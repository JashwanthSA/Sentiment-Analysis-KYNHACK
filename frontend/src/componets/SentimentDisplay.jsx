import { useState } from "react";
import SentimentPieChart from "./SentimentPieChart";
import SentimentBarChart from "./SentimentBarChart";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";
import Papa from "papaparse"; // Import PapaParse

const SentimentDisplay = ({ sentiments }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // Function to extract and format the required fields
  const extractPostData = (post) => {
    return {
      title: post.title,
      sentiment_score: post.post_sentiment.compound,
      positive_score: post.post_sentiment.pos,
      negative_score: post.post_sentiment.neg,
      neutral_score: post.post_sentiment.neu,
      url: post.url || "No URL available", // Replacing 'source' with 'url'
    };
  };

  // Function to export data to CSV using PapaParse
  const exportToCsv = (data, filename) => {
    const formattedData = data.map(extractPostData); // Extract relevant data
    const csv = Papa.unparse(formattedData); // Convert JSON data to CSV
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, filename); // Save the CSV file
  };

  // Function to export data to JSON format
  const exportToJson = (data, filename) => {
    const formattedData = data.map(extractPostData); // Extract relevant data
    const json = JSON.stringify(formattedData, null, 2); // Convert JSON data to string with indentation
    const blob = new Blob([json], {
      type: "application/json;charset=utf-8;",
    });
    saveAs(blob, filename); // Save the JSON file
  };

  // If a post is selected, show post details and allow exporting
  if (selectedPost) {
    return (
      <div>
        <button
          onClick={() => setSelectedPost(null)}
          className="font-semibold text-blue-700 mb-4 inline-block hover:underline transition duration-500"
        >
          ← Back to posts list
        </button>

        <div className="mb-6 p-4 bg-white rounded shadow-md border-red-700">
          <h3 className="text-xl font-semibold text-white m-4 bg-red-500 p-2 rounded-lg">
            {selectedPost.title}
          </h3>
          <ReactMarkdown className="text-gray-600 my-4">
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

          <hr className=" mx-auto" /> &nbsp;

          <SentimentBarChart
            barChartData={[
              {
                name: "Positive",
                positive: selectedPost.post_sentiment.pos,
                negative: 0,
                neutral: 0,
              },
              {
                name: "Neutral",
                positive: 0,
                negative: 0,
                neutral: selectedPost.post_sentiment.neu,
              },
              {
                name: "Negative",
                positive: 0,
                negative: selectedPost.post_sentiment.neg,
                neutral: 0,
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
            <strong>Sentiment Score:</strong> {selectedPost.post_sentiment.compound}
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
                          positive: comment.sentiment.pos,
                          negative: 0,
                          neutral: 0,
                        },
                        {
                          name: "Neutral",
                          positive: 0,
                          negative: 0,
                          neutral: comment.sentiment.neu,
                        },
                        {
                          name: "Negative",
                          positive: 0,
                          negative: comment.sentiment.neg,
                          neutral: 0,
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

        {/* Export Button */}
        <div className="mt-4">
          <button
            onClick={() => exportToCsv([selectedPost], "selectedPostData.csv")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-4"
          >
            Export to CSV
          </button>
          <button
            onClick={() => exportToJson([selectedPost], "selectedPostData.json")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Export to JSON
          </button>
        </div>
      </div>
    );
  }

  // If no post is selected, display the list of posts and export options
  return (
    <div>
      <div className="mb-6">
        {/* Export Buttons for Overall Data */}
        <div className="mb-4">
          <button
            onClick={() => exportToCsv(sentiments, "sentimentsData.csv")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-4"
          >
            Export All to CSV
          </button>
          <button
            onClick={() => exportToJson(sentiments, "sentimentsData.json")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Export All to JSON
          </button>
        </div>
      </div>

      {sentiments.map((post, index) => {
        const postSentimentData = [
          { name: "Positive", value: post.post_sentiment.pos, fill: "#4caf50" },
          { name: "Neutral", value: post.post_sentiment.neu, fill: "#ffeb3b" },
          { name: "Negative", value: post.post_sentiment.neg, fill: "#f44336" },
        ];

        const postBarChartData = [
          {
            name: "Positive",
            positive: post.post_sentiment.pos,
            negative: 0,
            neutral: 0,
          },
          {
            name: "Neutral",
            positive: 0,
            negative: 0,
            neutral: post.post_sentiment.neu,
          },
          {
            name: "Negative",
            positive: 0,
            negative: post.post_sentiment.neg,
            neutral: 0,
          },
        ];

        return (
          <div
            key={index}
            className="mb-6 p-4 bg-white rounded shadow-md cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <h3 className="text-xl font-semibold text-white m-4 bg-red-500 p-2 rounded-lg">
              {post.title}
            </h3>
            <ReactMarkdown className="text-gray-600 m-4">
              {post.selftext || "No description available."}
            </ReactMarkdown>

            {/* Sentiment Analysis for the Post */}
            <SentimentPieChart sentimentData={postSentimentData} title={post.title} />

            <hr className="mx-auto" /> &nbsp;

            <SentimentBarChart barChartData={postBarChartData} title={post.title} />
          </div>
        );
      })}
    </div>
  );
};

export default SentimentDisplay;

