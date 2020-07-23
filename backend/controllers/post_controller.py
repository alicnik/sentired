from flask import Blueprint, request, jsonify
from models.post_model import Post
from schemas.post_schema import PostSchema

post_schema = PostSchema()

router = Blueprint(__name__, 'posts')


@router.route('/posts', methods=['GET'])
def index():
    posts = Post.query.all()
    return post_schema.jsonify(posts, many=True), 200


@router.route('/posts/<reddit_id>', methods=['GET'])
def get_one(reddit_id):
    post = Post.query.filter_by(reddit_id=reddit_id).first()

    if not post:
        return jsonify({'message': 'This colour does not exist'}), 404

    return post_schema.jsonify(post), 200
