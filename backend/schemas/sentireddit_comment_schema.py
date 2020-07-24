from app import ma
from marshmallow import fields
from models.sentireddit_comment_model import SentiRedditComment
from schemas.base_schema import BaseSchema
from schemas.sentiment_schema import SentimentSchema


class SentiRedditCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    sentiment = fields.Nested('SentimentSchema')

    class Meta:
        model = SentiRedditComment
        load_instance = True
