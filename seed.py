from app import app, db
from models.user_model import User

with app.app_context():

    db.drop_all()
    db.create_all()

    alex = User(username='alicnik', email='alicnik@hotmail.com', password='joebloggs')

    db.session.add(alex)
    db.session.commit()
