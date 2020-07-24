from flask import Blueprint, request, jsonify
from models.post_model import Post
from schemas.post_schema import PostSchema
from models.reddit_comment_model import RedditComment
from models.sentiment_model import Sentiment
from datetime import *
from sentipraw import reddit
# from sentiment_analysis import get_sentiment
from sentiment_request import fetch_sentiment
import re

from lib.helpers import random_cage

# import logging

# handler = logging.StreamHandler()
# handler.setLevel(logging.DEBUG)
# for logger_name in ("praw", "prawcore"):
#     logger = logging.getLogger(logger_name)
#     logger.setLevel(logging.DEBUG)
#     logger.addHandler(handler)


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
        submission = reddit.request('GET', f'https://oauth.reddit.com/comments/{reddit_id}', {'limit': 3})
        data = submission[0]['data']['children'][0]['data']
        new_post = Post(
            reddit_id=data['id'],
            title=data['title'],
            body=data['selftext'],
            subreddit=data['subreddit'],
            reddit_author=data['author'],
            reddit_created_at=datetime.fromtimestamp(data['created_utc'])
        )
        if re.match('.(png|gif|jpe?g)$', data['url']):
            new_post.media = data['url']
        elif 'media' in data and data['media'] and 'reddit_video' in data['media']:
            new_post.media = data['media']['reddit_video']['fallback_url']
        elif 'preview' in data and data['preview'] and 'reddit_video_preview' in data['preview']:
            new_post.media = data['preview']['reddit_video_preview']['fallback_url']
        elif 'thumbnail' in data and data['thumbnail'] and data['thumbnail'] != 'self':
            new_post.media = data['thumbnail']
        else:
            new_post.media = random_cage()
        for comment in submission[1]['data']['children']:
            if 'body' not in comment['data']:
                continue
            new_reddit_comment = RedditComment(
                body=comment['data']['body'],
                subreddit=comment['data']['subreddit'],
                reddit_created_at=datetime.fromtimestamp(comment['data']['created_utc']),
                reddit_author=comment['data']['author']
            )
            new_reddit_comment.save()
            new_post.reddit_comments.append(new_reddit_comment)
        new_post.save()
        return post_schema.jsonify(new_post)
    return post_schema.jsonify(post), 200

    # print(post.__doc__)
    # # for att in dir(post):
    # #    print (att, getattr(post, att))
    # # pprint.pprint(vars(post))


@router.route('/posts/<reddit_id>/sentiment', methods=['GET'])
def analyse_post_and_comments(reddit_id):
    post = Post.query.filter_by(reddit_id=reddit_id).first()
    if not post:
        return jsonify({'message': 'Could not return post'}), 404
    # Reddit post titles do not always end with a full stop. Google Natural Language API analyses by sentence
    # so we provide a full stop to ease the analysis. There is not always a body on a post, so both the title
    # and body are combined for the analysis.
    text_to_analyse = f'{post.title}, {post.body}'
    print(text_to_analyse)
    language_sentiment = fetch_sentiment(text_to_analyse)
    print(language_sentiment)
    # Since sentiment is an individual class in its own table, we instantiate the Sentiment here to attach to the post.
    # language_sentiment is an object with .score and .magnitude properties on the object that Google returns.
    sentiment_instance = Sentiment(
        polarity=language_sentiment['score'],
        magnitude=language_sentiment['magnitude'],
        score=(language_sentiment['score'] * language_sentiment['magnitude']),
        post_id=post.id
    )
    sentiment_instance.save()
    for comment in post.reddit_comments:
        language_sentiment = fetch_sentiment(comment.body)
        comment_sentiment_instance = Sentiment(
            polarity=language_sentiment['score'],
            magnitude=language_sentiment['magnitude'],
            score=(language_sentiment['score'] * language_sentiment['magnitude']),
            reddit_comment_id=comment.id
        )
        comment_sentiment_instance.save()
    post.save()
    return post_schema.jsonify(post), 200
