from app import db

user_sentiments = db.Table(
   'user_sentiments',
   db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
   db.Column('sentiment_id', db.Integer, db.ForeignKey('sentiments.id'), primary_key=True)
)

user_viewed_posts = db.Table(
  'user_viewed_posts',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)

user_saved_posts = db.Table(
  'user_saved_posts',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)


