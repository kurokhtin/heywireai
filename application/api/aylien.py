import os
from dotenv import load_dotenv
import aylien_news_api
from aylien_news_api.rest import ApiException
import json
from flask import jsonify
import formats

load_dotenv()
API_ID = os.getenv("AYLIEN_API_ID")
API_KEY = os.getenv("AYLIEN_API_KEY")

configuration = aylien_news_api.Configuration()
configuration.api_key['X-AYLIEN-NewsAPI-Application-ID'] = API_ID
configuration.api_key['X-AYLIEN-NewsAPI-Application-Key'] = API_KEY

client = aylien_news_api.ApiClient(configuration)
api_instance = aylien_news_api.DefaultApi(client)

opts = {
    'published_at_end': 'NOW',
    'language': ['en'],
    'source_locations_country': ['US'],
    'categories_taxonomy': 'aylien',
    'not_entities_id' : ['N25240567620063168378490754444048642724'], #exclude sponsored
    'sort_by': 'relevance'
}

def aylien_get_stories(data):
    categories = data['cats'].split(', ')
    cat_search_string = " OR ".join([f"{{{{taxonomy: aylien AND id:{one_cat}}}}}" for one_cat in categories])

    def_opts = opts.copy()
    def_opts['published_at_start'], def_opts['per_page'], def_opts['aql'] = data['datetime'], int(data['total']), f'categories: ({cat_search_string}) AND entities:({{{{id:{data["location"]} AND overall_prominence:>=0.65}}}})'

    try:
        api_response = api_instance.list_stories(**def_opts)   
        json_response = [
            {
                'id': story.id,
                'body': story.body, 
                'author': story.author.to_dict(),
                'links': story.links.to_dict(),
                'media': [image.url for image in story.media],
                'published_at': str(story.published_at),
                'sentiment': story.sentiment.to_dict(),
                'summary': story.summary.to_dict(),
                'title': story.title,
                'words_count': story.words_count,
                'categories': [category.label for category in story.categories],
                'characters_count': story.characters_count,
                'sentences_count': story.sentences_count,
                'source': story.source.name
            } 
            for story in api_response.stories]
        response_str = json.dumps(json_response)

        return response_str

        # with open('data.log', 'a') as log_file:
        #     log_file.write(str(api_response) + '\n')
        # return type(api_response)
    except ApiException as e:
        error_data = "Exception when calling DefaultApi->list_stories: %s\n" % e
        print(error_data)
        with open('data.log', 'a') as log_file:
            log_file.write(str(error_data) + '\n')
        # return error_data
        return_json_error(e)

def get_one_story(id):
    one_opts = opts.copy()
    one_opts['id'], one_opts['per_page'] = [id], 1
    try:
        api_response = api_instance.list_stories(**one_opts)
        return api_response.stories[0]
    except ApiException as e:
        return_json_error(e)

def get_relatives(id):
    rel_opts = opts.copy()
    rel_opts['story_id'], rel_opts['per_page'], rel_opts['not_id'], rel_opts['published_at_start'] = id, 2, [id], 'NOW-7DAYS'
    rel_opts = {k: v for k, v in opts.items() if k != 'sort_by'}
    print(rel_opts)
    try:
        related_response = api_instance.list_related_stories_get(**rel_opts)
        return related_response.related_stories
    except ApiException as e:
        return_json_error(e)

def return_json_error(error):
    error_response = {
        "error": error.status,
        "message": "Exception when calling DefaultApi->list_stories: %s\n" % error
    }
    return jsonify(error_response), error.status

def full_story(id):
    original_story = get_one_story(id)
    relatives = get_relatives(id)
    full_article = [formats.convert_story(original_story)] + [formats.convert_story(item) for item in relatives[:2]]

    print(relatives)

    return full_article