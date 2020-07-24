# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# Instantiates a client
client = language.LanguageServiceClient()

text1 = "I love this"

def get_sentiment(text):
    document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)
    print(document)
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    print(sentiment)
    return sentiment

get_sentiment(text1)