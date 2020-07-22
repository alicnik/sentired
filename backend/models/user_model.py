from app import db, bcrypt
from models.base_model import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from environment.config import secret
from datetime import *
import jwt

user_sentiments = db.Table('user_sentiments',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('sentiment_id', db.Integer, db.ForeignKey('sentiments.id'), primary_key=True)
)

class User(db.Model, BaseModel):
  __tablename__ = 'users'

  username = db.Column(db.String(20), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=True)
  aggregate_sentiment = db.Column(db.Float)
  # comments = db.Column()
  # viewed_posts = db.Column()
  # saved_posts = db.Column()
  last_logged_in = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')
  
  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)

  def generate_token(self):
    payload = {
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }
    
    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token






