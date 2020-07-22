from marshmallow import fields

class BaseSchema:
  created_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
  updated_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
