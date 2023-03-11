from flask import Blueprint, jsonify, request
from . import aylien
from . import formats
from . import gpt
import json
import nltk
import time
from nltk.sentiment import SentimentIntensityAnalyzer
from . import error_handling

nltk.download('vader_lexicon')

api = Blueprint('api', __name__)
nltk.download('punkt')

# @api.route('/hello')
# def hello():
#     return jsonify({'message': 'Hello, world!'})


@api.route('/get_stories', methods=['POST'])
def get_stories():
    try:
        data = request.get_json()
        if data is not None:
            # with open('data.log', 'a') as log_file:
            #     log_file.write(str(data) + '\n')
            # return 'Data received'
            return aylien.aylien_get_stories(data)
        else:
            return jsonify(error='Invalid JSON data'), 400
    except Exception as e:
        error_msg = f"Error: {str(e)}"
        error_handling.log_error(error_msg)
        return jsonify(error=str(e)), 400


@api.route('/generate_story', methods=['POST'])
def generate_story():
    try:
        data = request.get_json()
        if 'id' not in data:
            return jsonify(error='Missing id parameter'), 400
        if 'style' not in data:
            return jsonify(error='Missing writing style parameter'), 400
        try:
            story_id = int(data['id'])
        except ValueError:
            return jsonify(error='Invalid id parameter'), 400
        
        if data is None:
            return jsonify(error='Invalid JSON data'), 400
            # with open('data.log', 'a') as log_file:
            #     log_file.write(str(data) + '\n')
            # return 'Data received'
        full_story = aylien.full_story(story_id)

        if full_story is not None:
            start_time = time.time()

            def serialize(obj):
                if isinstance(obj, set):
                    return list(obj)
                raise TypeError(f"{obj} is not JSON serializable")
            # return formats.combine_story(full_story)
            combined_story = formats.combine_story(full_story)
            ai_story = gpt.generate_story(
                data['style'],
                combined_story['links'], 
                combined_story['entities'], 
                combined_story['text']
            )
            
            lines = ai_story.split('\n')
            if lines[0] == '':
                title = lines[1]
                content = '\n'.join(lines[2:])
            else:
                title = lines[0]
                content = '\n'.join(lines[1:])

            words = content.split()
            sentences = nltk.sent_tokenize(content)
            end_time = time.time()
            elapsed_time = end_time - start_time

            combined_story['id'] = data['id']
            combined_story['title'] = title
            combined_story['text'] = content
            combined_story['words_count'] = len(words)
            combined_story['characters_count'] = len(content)
            combined_story['sentences_count'] = len(sentences)
            combined_story['response_time'] = "{:.2f}".format(elapsed_time)
            combined_story['sentiment'] = {}
            combined_story['sentiment']['body'] = get_sentiment(content)
            combined_story['sentiment']['title'] = get_sentiment(title)

            return json.dumps(combined_story, default=serialize)


        else:
            return jsonify(error='Invalid JSON data'), 400
    except Exception as e:
        error_msg = f"Error: {str(e)}"
        error_handling.log_error(error_msg)
        return jsonify(error=str(e)), 400

def get_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    sentiment = sia.polarity_scores(text)

    if sentiment['compound'] > 0:
        return {'polarity': 'positive', 'score': round(sentiment['compound'], 2)}
    elif sentiment['compound'] < 0:
        return {'polarity': 'negative', 'score': round(sentiment['compound'], 2)}
    else:
        return {'polarity': 'neutral', 'score': round(sentiment['compound'], 2)}