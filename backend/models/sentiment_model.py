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
    # ? Deletion of sentireddit_comments should not delete the sentiment as users may have already interacted with the comment
    # ? and therefore the sentiment, a relationship which should persist for accurate calculation of the user's aggregate sentiment.
    # ? Accordingly, ondelete='SET NULL' is set.

    sentireddit_comment_id = db.Column(db.Integer, db.ForeignKey('sentireddit_comments.id', ondelete='SET NULL'))
    reddit_comment_id = db.Column(db.Integer, db.ForeignKey('reddit_comments.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))