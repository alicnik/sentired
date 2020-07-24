from flask import Blueprint, request, jsonify, g
from models.user_model import User
from schemas.user_schema import UserSchema
# from app import db
# from lib.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/users', methods=['GET'])
def index():
  users = User.query.all()
  return user_schema.jsonify(users, many=True), 200

