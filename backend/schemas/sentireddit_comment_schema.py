from app import ma
from marshmallow import fields
from models.sentireddit_comment_model import SentiRedditComment
from schemas.base_schema import BaseSchema
# from schemas.user_schema import UserSchema
from schemas.sentiment_schema import SentimentSchema


class SentiRedditCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    sentiment = fields.Nested('SentimentSchema')
    user = fields.Nested('UserSchema', only=(('username', 'avatar')))

    class Meta:
        model = SentiRedditComment
        load_instance = True
