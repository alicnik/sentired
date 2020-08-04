from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from environment.config import db_URI
from flask_bcrypt import Bcrypt

import os

app = Flask(__name__, static_folder='dist')

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)

from controllers import user_controller, post_controller, sentireddit_comment_controller, home_controller

app.register_blueprint(user_controller.router, url_prefix="/api")
app.register_blueprint(post_controller.router, url_prefix="/api")
app.register_blueprint(sentireddit_comment_controller.router, url_prefix="/api")
app.register_blueprint(home_controller.router, url_prefix="/api")

@app.route('/', defaults={'path': ''}) 
@app.route('/<path:path>') 
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'dist/' + path)

    if os.path.isfile(filename): 
        return app.send_static_file(path)

    return app.send_static_file('index.html') 