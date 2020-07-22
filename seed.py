from app import app, db

from models.user_model import User
from models.post_model import Post

with app.app_context():
  db.drop_all()
  db.create_all()

  kianna = User(
    username="kianna",
    email="kianna@kianna.com",
    password="kianna"
  )

  alex = User(
    username="alicnik",
    email="alicnik@alicnik.com",
    password="alicnik"
  )

  db.session.add(kianna)
  db.session.add(alex)

  db.session.commit()

  post1 = Post(
    reddit_id="222",
    title="A post"
  )

  db.session.add(post1)
  db.session.commit()
  