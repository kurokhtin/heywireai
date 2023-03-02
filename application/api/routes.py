from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/hello')
def hello():
    return jsonify({'message': 'Hello, world!'})