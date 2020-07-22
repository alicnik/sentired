from app import db
from models.base_model import BaseModel

class SentiRedditComment(db.Model, BaseModel):

  body = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer) #relationships
  sentiment_score = db.Column(db.Float) #relationships