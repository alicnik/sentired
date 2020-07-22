from app import ma
from marshmallow import fields
from models.post_model import Post
from schemas.base_schema import BaseSchema

class PostSchema(ma.SQLAlchemyAutoSchema, BaseSchema):


  class Meta:
    model = Post
    
