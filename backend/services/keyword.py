# type: ignore
from rake_nltk import Rake

# Initialize RAKE
rake = Rake()
# Rapid automatic keyword extraction


def extract_keywords(text, max_keywords=5):
    rake.extract_keywords_from_text(text)
    keywords = rake.get_ranked_phrases()[:max_keywords] 
    return keywords
