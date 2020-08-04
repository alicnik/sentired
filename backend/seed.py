from app import app, db
from datetime import datetime

from models.user_model import User
from models.post_model import Post
from models.reddit_comment_model import RedditComment
from models.sentireddit_comment_model import SentiRedditComment
from models.sentiment_model import Sentiment
from models.api_calls_model import ApiCalls

with app.app_context():
    db.drop_all()
    db.create_all()

    kianna = User(
        username="kianna",
        email="kianna@kianna.com",
        password="Kianna123"
    )

    alex = User(
        username="alicnik",
        email="alicnik@hotmail.com",
        password="Alicnik123"
    )

    calls = ApiCalls(count=0)

    db.session.add(calls)
    db.session.add(kianna)
    db.session.add(alex)
    
    db.session.commit()


