from app import db
from models.base_model import BaseModel
from models.post_model import Post
from models.sentireddit_comment_model import SentiRedditComment
from models.reddit_comment_model import RedditComment


class Sentiment(db.Model, BaseModel):

    __tablename__ = 'sentiments'

    polarity = db.Column(db.Float, nullable=False)
    score = db.Column(db.Float, nullable=False)
    magnitude = db.Column(db.Float, nullable=False)

    # ? Here we constrain the following columns to only contain the id of the post/comment to which the sentiment refers.
    # ? On the respective tables, we define a sentiment column which links back to the sentiment model.

    sentireddit_comment_id = db.Column(db.Integer, db.ForeignKey('sentireddit_comments.id'))
    reddit_comment_id = db.Column(db.Integer, db.ForeignKey('reddit_comments.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    # sentireddit_comment = db.relationship('SentiRedditComment', back_populates='sentiment')
    # post = db.relationship('Post', back_populates='sentiment')
    # reddit_comment = db.relationship('RedditComment', back_populates='sentiment')
