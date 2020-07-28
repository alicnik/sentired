from flask import Blueprint, request, jsonify, g
from models.user_model import User
from models.post_model import Post
from schemas.user_schema import UserSchema
from schemas.post_schema import PostSchema
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError
from lib.secure_route import secure_route

# from app import db
# from lib.secure_route import secure_route

user_schema = UserSchema()
post_schema = PostSchema()

router = Blueprint(__name__, 'users')


@router.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user), 200

@router.route('/users/<int:id>/saved', methods=['PUT'])
@secure_route
def edit_user(id):
    user = User.query.get(id)
    if user.id != g.current_user.id:
       return jsonify({ 'message': "You cannot edit someone else's profile" })
    data = request.get_json()
    post = Post.query.filter_by(reddit_id=data['redditId']).first()
    if post in user.saved_posts:
        user.saved_posts = [saved_post for saved_post in user.saved_posts if post.id != saved_post.id]
    else:
        user.saved_posts.append(post)
    user.save()
    return post_schema.jsonify(post), 201


@router.route('/register', methods=['POST'])
def register():
    try:
        user = user_schema.load(request.get_json())
    except ValidationError as err:
        return {'errors': err.messages}, 400
    user.save()
    return user_schema.jsonify(user)


@router.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    # Error handling structure to echo structure of marshmallow's validation error response,
    # facilitating display of errors on front end to user.
    if not user:
        return jsonify({'errors': {
            'email': 'User not found'
        }}), 404
    if not user.validate_password(data['password']):
        return jsonify({'errors': {
            'password': 'Incorrect password'
        }}), 401
    token = user.generate_token()
    # Update user's last logged in property to current date and time.
    user.last_logged_in = datetime.now()
    user.save()
    return jsonify({
        'token': token,
        'id': user.id,
        'username': user.username,
        'aggregate_sentiment': user.aggregate_sentiment,
        'emotion': user.emotion
    })


