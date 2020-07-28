from flask import Blueprint, request, jsonify, g
from models.sentireddit_comment_model import SentiRedditComment
from models.sentiment_model import Sentiment
from schemas.sentireddit_comment_schema import SentiRedditCommentSchema
from models.post_model import Post
from schemas.post_schema import PostSchema
from sentiment_request import fetch_sentiment
from lib.helpers import random_cage
from marshmallow import ValidationError
from lib.secure_route import secure_route
from datetime import datetime

# Instantiating the schema
sentireddit_comment_schema = SentiRedditCommentSchema()
post_schema = PostSchema()

router = Blueprint(__name__, 'sentireddit_comments')


@router.route('/posts/<reddit_id>/comments', methods=['POST'])
@secure_route
# We use the post_id, i.e. the id on our db, as this facilitates adding the post_id to the comment to link them up.
def add_comment(reddit_id):
    post = Post.query.filter_by(reddit_id=reddit_id).first()
    data = request.get_json()
    try:
        comment = sentireddit_comment_schema.load(data)
        comment.user_id = g.current_user.id
        comment.post_id = post.id
        comment.created_at = datetime.now()
        comment.updated_at = datetime.now()
        comment.save()
        language_sentiment = fetch_sentiment(comment.body)
        sentiment_instance = Sentiment(
            polarity=language_sentiment['score'],
            magnitude=language_sentiment['magnitude'],
            score=(language_sentiment['score'] * language_sentiment['magnitude']),
            sentireddit_comment_id=comment.id
        )
        sentiment_instance.save()
    except ValidationError as err:
        return {'errors': err.messages}, 422
    # comment.save()
    return post_schema.jsonify(post), 201


@router.route('/posts/<reddit_id>/comments/<comment_id>', methods=['PUT'])
@secure_route
def edit_comment(comment_id, reddit_id):
    post = Post.query.filter_by(reddit_id=reddit_id).first()
    existing_comment = SentiRedditComment.query.get(comment_id)
    comment = sentireddit_comment_schema.load(request.get_json(), instance=existing_comment, partial=True)
    if comment.user != g.current_user:
        return jsonify({'message': "You can't edit another user's comment"}), 401
    # Remove existing sentiment so that re-analysed sentiment attaches to the updated comment. Existing sentiment persists so that users who have already seen the comment continue to have that relationship.
    comment.sentiment = None
    comment.updated_at = datetime.now()
    language_sentiment = fetch_sentiment(comment.body)
    sentiment_instance = Sentiment(
        polarity=language_sentiment['score'],
        magnitude=language_sentiment['magnitude'],
        score=(language_sentiment['score'] * language_sentiment['magnitude']),
        sentireddit_comment_id=comment.id
    )
    sentiment_instance.save()
    comment.save()
    return post_schema.jsonify(post), 201


@router.route('/posts/<reddit_id>/comments/<comment_id>', methods=['DELETE'])
@secure_route
def delete_comment(comment_id, reddit_id):
    post = Post.query.filter_by(reddit_id=reddit_id).first()
    comment = SentiRedditComment.query.get(comment_id)
    if comment.user != g.current_user:
        return jsonify({'message': "You can't delete another user's comment"}), 401
    comment.remove()
    return post_schema.jsonify(post), 201
