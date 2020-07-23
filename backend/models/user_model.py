from app import db, bcrypt
from models.base_model import BaseModel
from models.sentiment_model import Sentiment
from models.join_tables import *
from sqlalchemy.ext.hybrid import hybrid_property
from environment.config import secret
from datetime import *
import jwt

# user_sentiments = db.Table(
#     'user_sentiments',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('sentiment_id', db.Integer, db.ForeignKey('sentiments.id'), primary_key=True)
# )


class User(db.Model, BaseModel):
    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    aggregate_sentiment = db.Column(db.Float)
    last_logged_in = db.Column(db.DateTime, nullable=True, default=datetime.utcnow())

    comments = db.relationship('SentiRedditComment', backref='user')
    user_sentiments = db.relationship('Sentiment', secondary=user_sentiments, backref='user')
    user_viewed_posts = db.relationship('Post', secondary=user_viewed_posts)
    user_saved_posts = db.relationship('Post', secondary=user_saved_posts)

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
        token = jwt.encode(payload, secret, 'HS256').decode('utf-8')
        return token

        # hybrid property for aggregate_sentiment that analyses the user_sentiments join table for an aggregate score?
