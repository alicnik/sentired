from flask import request, jsonify, g
from functools import wraps
import jwt
from environment.config import secret
from models.user_model import User


def secure_route(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        try:
            payload = jwt.decode(token, secret)
            g.current_user = User.query.get(payload['sub'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except Exception as e:
            return jsonify({'message': 'Unauthorized', "errors": e.messages}), 401
        return func(*args, **kwargs)
    return wrapper
