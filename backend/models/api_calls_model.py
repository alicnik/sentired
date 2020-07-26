from app import db
from models.base_model import BaseModel


class ApiCalls(db.Model, BaseModel):
    __tablename__ = 'api_calls'
    count = db.Column(db.Integer)
