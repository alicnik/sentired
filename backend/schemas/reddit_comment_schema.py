from app import ma
from marshmallow import fields
from models.reddit_comment_model import RedditComment
from schemas.base_schema import BaseSchema
from schemas.sentiment_schema import SentimentSchema


class RedditCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    sentiment = fields.Nested('SentimentSchema')

    class Meta:
        model = RedditComment
