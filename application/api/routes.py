from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__)

@api.route('/hello')
def hello():
    return jsonify({'message': 'Hello, world!'})


@api.route('/get_stories', methods=['POST'])
def get_stories():
    try:
        data = request.get_json()
        if data is not None:
            with open('data.log', 'a') as log_file:
                log_file.write(str(data) + '\n')
            return 'Data received'
        else:
            return jsonify(error='Invalid JSON data'), 400
    except Exception as e:
        return jsonify(error=str(e)), 400