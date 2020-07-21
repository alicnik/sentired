from app import ma
from marshmallow import fields

from schemas.base_schema import BaseSchema
from models.user_model import User


class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):  # noqa

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('password',)
