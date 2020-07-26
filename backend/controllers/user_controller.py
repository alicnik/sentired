from flask import Blueprint, request, jsonify, g
from models.user_model import User
from schemas.user_schema import UserSchema
from datetime import datetime
# from app import db
# from lib.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, 'users')


@router.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/register', methods=['POST'])
def register():
    user = user_schema.load(request.get_json())
    user.save()
    return user_schema.jsonify(user)


@router.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if not user.validate_password(data['password']):
        return jsonify({'message': 'Incorrect password'}), 401
    token = user.generate_token()
    # Update user's last logged in property to current date and time.
    user.last_logged_in = datetime.utcnow()
    user.save()
    return jsonify({'token': token, 'message': 'Welcome back!'})

# attempting to add routes back
