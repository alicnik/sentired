from app import db
from models.base_model import BaseModel

class Sentiment(db.Model, BaseModel):

  __tablename__ = 'sentiments'

  polarity = db.Column(db.Float, nullable=False)
  score = db.Column(db.Float, nullable=False)
  magnitude = db.Column(db.Float, nullable=False)

