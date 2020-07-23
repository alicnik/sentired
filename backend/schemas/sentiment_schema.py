from app import ma
from schemas.base_schema import BaseSchema
from models.sentiment_model import Sentiment


class SentimentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    class Meta:
        model = Sentiment
