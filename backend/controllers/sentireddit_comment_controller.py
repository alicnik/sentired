from flask import Blueprint, request, jsonify, g
from models.sentireddit_comment_model import SentiRedditComment
from models.sentiment_model import Sentiment
from schemas.sentireddit_comment_schema import SentiRedditCommentSchema
from models.post_model import Post
from schemas.post_schema import PostSchema
from sentiment_analysis import get_sentiment
from lib.helpers import random_cage
from marshmallow import ValidationError
from lib.secure_route import secure_route

# Instantiating the schema
sentireddit_comment_schema = SentiRedditCommentSchema()

router = Blueprint(__name__, 'sentireddit_comments')

@router.route('/posts/<post_id>/comments', methods=['POST'])
@secure_route
def add_comment(post_id):
  data = request.get_json()
  data['user_id'] = g.current_user.id
  data['post_id'] = post_id
  try:
      comment = sentireddit_comment_schema.load(data)
      comment.save()   
      language_sentiment = get_sentiment(comment.body)
      sentiment_instance = Sentiment(
        polarity=language_sentiment.score,
        magnitude=language_sentiment.magnitude,
        score=(language_sentiment.score * language.sentiment.magnitude),
        sentireddit_comment_id=comment.id
      )
      sentiment_instance.save()
  except ValiditonError as err:
      return {'errors': err.messages}, 422
  # comment.save()
  return sentireddit_comment_schema.jsonify(comment), 201

@router.route('/posts/<post_id>/comments/<comment_id>', methods=['PUT'])
@secure_route
def edit_comment(comment_id):
  existing_comment = SentiRedditComment.query.get(comment_id)
  comment = sentireddit_comment_schema.load(request.get_json(), instance=existing_comment, partial=True)
  if comment.user != g.current_user:
    return jsonify({ 'message': "You can't edit another user's comment" }), 401
  language_sentiment = get_sentiment(comment.body)
  sentiment_instance = Sentiment(
      polarity=language_sentiment.score,
      magnitude=language_sentiment.magnitude,
      score=(language_sentiment.score * language.sentiment.magnitude),
      sentireddit_comment_id=comment.id
  )
  sentiment_instance.save()
  comment.save()
  return sentireddit_comment_schema.jsonify(comment), 201

@router.route('/posts/<post_id>/comments/<comment_id>', methods=['PUT'])
@secure_route
def delete_comment(comment_id):
  comment = SentiRedditComment.query.get(comment_id)
  if comment.user != g.current_user:
    return jsonify({ 'message': "You can't delete another user's comment" }), 401
  comment.remove()
  return jsonify({ 'message': "Successfully deleted!" }), 200