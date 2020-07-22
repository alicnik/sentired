from app import ma
from marshmallow import fields
from models.reddit_comment_model import RedditComment
from schemas.base_schema import BaseSchema

class RedditCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = RedditComment