from app import app, db
from datetime import datetime

from models.user_model import User
from models.post_model import Post
from models.reddit_comment_model import RedditComment
from models.sentireddit_comment_model import SentiRedditComment
from models.sentiment_model import Sentiment

with app.app_context():
    db.drop_all()
    db.create_all()

    kianna = User(
        username="kianna",
        email="kianna@kianna.com",
        password="kianna"
    )

    alex = User(
        username="alicnik",
        email="alicnik@alicnik.com",
        password="alicnik"
    )

    db.session.add(kianna)
    db.session.add(alex)
    db.session.commit()

    post1 = Post(
        reddit_id="222",
        title="A post"
    )

    reddit_comment1 = RedditComment(
        body='This post is fantastic',
        post=post1
    )

    sentireddit_comment1 = SentiRedditComment(
        body='I disagree!',
        user=alex,
        post=post1
    )

    post_sentiment = Sentiment(
        polarity=0.3,
        magnitude=4.2,
        score=(4.2 * 0.3),
        post=post1
    )
    reddit_comment_sentiment = Sentiment(
        polarity=0.3,
        magnitude=4.2,
        score=(4.2 * 0.3),
        reddit_comment=reddit_comment1
    )
    sentireddit_comment_sentiment = Sentiment(
        polarity=0.3,
        magnitude=4.2,
        score=(4.2 * 0.3),
        sentireddit_comment=sentireddit_comment1
    )

    db.session.add(post1)
    db.session.add(reddit_comment1)
    db.session.add(sentireddit_comment1)
    db.session.add(post_sentiment)
    db.session.add(reddit_comment_sentiment)
    db.session.add(sentireddit_comment_sentiment)

    alex.user_sentiments = [post_sentiment, reddit_comment_sentiment, sentireddit_comment_sentiment]
    db.session.add(alex)

    db.session.commit()
