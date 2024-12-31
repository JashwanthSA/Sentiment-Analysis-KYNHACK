# type: ignore
from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests
import nltk
from services.stats import calculate_sentiment_stats
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download("vader_lexicon")
nltk.download("stopwords")
nltk.download("punkt_tab")
from services.keyword import extract_keywords
# Initialize Flask app
app = Flask(__name__)
CORS(app)  
sia = SentimentIntensityAnalyzer()


def fetch_reddit_data_with_comments(subreddit, limit=10):
    headers = {"User-Agent": "reddit-sentiment-app"}
    url = f"https://www.reddit.com/r/{subreddit}/new.json?limit={limit}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        posts = []
        for item in data.get("data", {}).get("children", []):
            post_data = item["data"]
            post_id = post_data.get("id", "")
            comments = fetch_comments(post_id)  # Fetch comments for the post
            posts.append({
                "title": post_data.get("title", ""),
                "selftext": post_data.get("selftext", ""),
                "upvote_ratio": post_data.get("upvote_ratio", 0),
                "score": post_data.get("score", 0),
                "url": post_data.get("url", ""),
                "subreddit": post_data.get("subreddit", ""),
                "created": post_data.get("created", 0),
                "comments": comments,
            })
        return posts
    else:
        return []


def fetch_comments(post_id):
    headers = {"User-Agent": "reddit-sentiment-app"}
    url = f"https://www.reddit.com/comments/{post_id}.json"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        # print(data)
        comments = []
        for comment in data[1]["data"]["children"]:
            comment_data = comment.get("data", {})
            comments.append(comment_data.get("body", ""))
        return comments
    else:
        return []

def analyze_sentiment_with_comments(posts):
    results = []
    for post in posts:
        post_text = f"{post['title']} {post['selftext']}"
        post_sentiment = sia.polarity_scores(post_text)
        post_keywords = extract_keywords(post_text)
    
        comments_sentiments = []
        comment_stats = {"positive": 0, "neutral": 0, "negative": 0}
        comment_keywords = []
        for comment in post["comments"]:
            sentiment = sia.polarity_scores(comment)
            comments_sentiments.append({"comment": comment, "sentiment": sentiment})

            comment_keywords.extend(extract_keywords(comment, max_keywords=3))

        comment_stats = calculate_sentiment_stats([s["sentiment"] for s in comments_sentiments])

        results.append({
            "title": post["title"],
            "selftext": post["selftext"],
            "url": post["url"],
            "upvote_ratio": post["upvote_ratio"],
            "score": post["score"],
            "post_sentiment": post_sentiment,
            "post_keywords": post_keywords,
            "post_stats": calculate_sentiment_stats([post_sentiment]),
            "comments": comments_sentiments,
            "comment_stats": comment_stats,
            "comment_keywords": list(set(comment_keywords))
        })
    # print(results)

    return results

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    subreddit = data.get("subreddit", "technology")
    limit = data.get("limit", 10)

    posts = fetch_reddit_data_with_comments(subreddit, limit)

    # Perform sentiment analysis
    analysis = analyze_sentiment_with_comments(posts)
    # print(analysis)
    return jsonify(analysis)


@app.route("/hello", methods=["GET"])
def hello():
    return "Hello, this is the Reddit Sentiment Analysis API!"

if __name__ == "__main__":
    app.run(debug=True)
