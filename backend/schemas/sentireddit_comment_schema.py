from app import ma
from models.sentireddit_comment_model import SentiRedditComment
from schemas.base_schema import BaseSchema

class SentiRedditCommentSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = SentiRedditComment