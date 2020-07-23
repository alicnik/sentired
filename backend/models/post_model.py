from app import db
from models.base_model import BaseModel


class Post(db.Model, BaseModel):
    __tablename__ = 'posts'

    reddit_id = db.Column(db.String(20), nullable=False, unique=True)
    title = db.Column(db.String(40), nullable=False)
    body = db.Column(db.Text, nullable=True)
    media = db.Column(db.String, nullable=True)
    subreddit = db.Column(db.String, nullable=True)

    # ? Here we like the relationships for the post. As we want to display one sentiment
    # ? on each post, we pass uselist=False when we instantiate the relationship.
    # ? For consistency, we define the relationships on the parent (i.e. here) and link the ids on
    # ? the child model.

    sentiment = db.relationship('Sentiment', uselist=False, backref='post')
    reddit_comments = db.relationship('RedditComment', backref='post')
    sentireddit_comments = db.relationship('SentiRedditComment', backref='post')
