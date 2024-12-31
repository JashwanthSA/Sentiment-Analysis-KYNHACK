def calculate_sentiment_stats(sentiments):
    stats = {"positive": 0, "neutral": 0, "negative": 0}
    for sentiment in sentiments:
        if sentiment["compound"] > 0.05:
            stats["positive"] += 1
        elif sentiment["compound"] < -0.05:
            stats["negative"] += 1
        else:
            stats["neutral"] += 1
    return stats