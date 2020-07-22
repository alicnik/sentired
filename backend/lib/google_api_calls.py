from app import db

google_api_calls = db.Table('google_api_calls',
    db.Column(db.Integer)
)


