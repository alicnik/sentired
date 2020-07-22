from app import db
from models.base_model import BaseModel

class Post(db.Model, BaseModel):
  __tablename__ = 'posts'

  reddit_id = db.Column(db.String(20), nullable=False, unique=True)
  title = db.Column(db.String(40), nullable=False)
  body = db.Column(db.Text, nullable=True)
  media = db.Column(db.String, nullable=True)
  subreddit = db.Column(db.String, nullable=True)
  # post_sentiment = db.Column(db.Integer)
  # document_sentiment = db.Column(db.Integer)



  