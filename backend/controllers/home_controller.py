from flask import Blueprint, request, jsonify, g
from sentipraw import reddit
from lib.helpers import random_cage

router = Blueprint(__name__, 'home')

# categories = ['hot', 'new', 'rising', 'top', 'controversial']


@router.route('/home/<category>', methods=['GET'])
def index(category):
    data = reddit.request('GET', f'https://oauth.reddit.com/{category}')
    return jsonify(data), 200

@router.route('/home/search/<query>', methods=['GET'])
def search(query):
    data = reddit.request('GET', f'https://oauth.reddit.com/search?q={query}')
    return jsonify(data), 200