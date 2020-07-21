from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime, timedelta
import jwt

from environment.config import secret
from models.base_model import BaseModel


class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

    def generate_token(self):
        payload = {'sub': self.id, 'iat': datetime.utcnow(), 'exp': datetime.utcnow() + timedelta(days=1)}
        token = jwt.encode(payload, secret, algorithm='HS256').decode('utf-8')
        return token
