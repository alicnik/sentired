from app import db
from models.base_model import BaseModel
from models.post_model import Post
from datetime import *


class RedditComment(db.Model, BaseModel):
    __tablename__ = 'reddit_comments'

    body = db.Column(db.Text, nullable=False)
    reddit_created_at = db.Column(db.DateTime)
    subreddit = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    sentiment = db.relationship('Sentiment', uselist=False, backref='reddit_comment')
