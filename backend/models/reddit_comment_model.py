from app import db
from models.base_model import BaseModel
from datetime import *

class RedditComment(db.Model, BaseModel):
  __tablename__ = 'reddit_comments'

  body = db.Column(db.Text, nullable=False)
  reddit_created_at = db.Column(db.DateTime)
  subreddit = db.Column(db.String)
  # parent_post = db.Column(db.String)
  # sentiment_score = db.Column(db.Integer)
