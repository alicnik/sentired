from app import ma
from marshmallow import fields
from models.post_model import Post
from schemas.base_schema import BaseSchema
from schemas.sentiment_schema import SentimentSchema
from schemas.reddit_comment_schema import RedditCommentSchema
from schemas.sentireddit_comment_schema import SentiRedditCommentSchema


class PostSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    sentiment = fields.Nested('SentimentSchema')
    reddit_comments = fields.Nested('RedditCommentSchema', many=True)
    sentireddit_comments = fields.Nested('SentiRedditCommentSchema', many=True)

    class Meta:
        model = Post
        load_instance = True
