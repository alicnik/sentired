from flask import Blueprint, request, jsonify
from models.post_model import Post
from schemas.post_schema import PostSchema
from models.reddit_comment_model import RedditComment
from datetime import *
from praw.models import MoreComments
from sentipraw import reddit
import re
import random

# import logging

# handler = logging.StreamHandler()
# handler.setLevel(logging.DEBUG)
# for logger_name in ("praw", "prawcore"):
#     logger = logging.getLogger(logger_name)
#     logger.setLevel(logging.DEBUG)
#     logger.addHandler(handler)

def random_cage():
    sizes = [200,250,300,350,400]
    return f'https://www.placecage.com/c/{random.choice(sizes)}/{random.choice(sizes)}'

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
        submission = reddit.request('GET', f'https://oauth.reddit.com/comments/{reddit_id}', {'limit': 30})
        data = submission[0]['data']['children'][0]['data']
        new_post = Post(
            reddit_id=data['id'],
            title=data['title'],
            body=data['selftext'],
            subreddit=data['subreddit']
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
            new_reddit_comment = RedditComment(
                body=comment['data']['body'],
                subreddit=comment['data']['subreddit'],
                reddit_created_at=datetime.fromtimestamp(comment['data']['created_utc'])
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