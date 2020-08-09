from app import db, bcrypt
from models.base_model import BaseModel
from models.sentiment_model import Sentiment
from models.join_tables import *
from sqlalchemy.ext.hybrid import hybrid_property
from environment.config import secret
from datetime import *
import jwt
from lib.helpers import random_cage

class User(db.Model, BaseModel):
    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, unique=True)
    avatar = db.Column(db.Text, nullable=True, default=(random_cage()))
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    # Sentiment scores will range from -inf to +inf, so default of 0 is given to all users upon creation
    aggregate_sentiment = db.Column(db.Float, default=0)
    last_logged_in = db.Column(db.DateTime, nullable=True, default=datetime.now())
    # Emotion value will be passed to front end for conditional rendering of emotional UI,
    # will be a string of happy/sad/angry/neutral/ecstatic
    emotion = db.Column(db.String(50), default="neutral")

    comments = db.relationship('SentiRedditComment', backref='user')
    user_sentiments = db.relationship('Sentiment', secondary=user_sentiments, backref='user')
    viewed_posts = db.relationship('Post', secondary=user_viewed_posts)
    saved_posts = db.relationship('Post', secondary=user_saved_posts)

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
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now(),
            'sub': self.id
        }
        token = jwt.encode(payload, secret, 'HS256').decode('utf-8')
        return token
