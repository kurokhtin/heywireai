import os
from dotenv import load_dotenv
import aylien_news_api
from aylien_news_api.rest import ApiException
import json

load_dotenv()
API_ID = os.getenv("AYLIEN_API_ID")
API_KEY = os.getenv("AYLIEN_API_KEY")

configuration = aylien_news_api.Configuration()
configuration.api_key['X-AYLIEN-NewsAPI-Application-ID'] = API_ID
configuration.api_key['X-AYLIEN-NewsAPI-Application-Key'] = API_KEY

client = aylien_news_api.ApiClient(configuration)
api_instance = aylien_news_api.DefaultApi(client)

def aylien_get_stories(data):
    categories = data['cats'].split(', ')
    cat_search_string = " OR ".join([f"{{{{taxonomy: aylien AND id:{one_cat}}}}}" for one_cat in categories])

    opts = {
        'published_at_start': data['datetime'],
        'published_at_end': 'NOW',
        'language': ['en'],
        'per_page': int(data['total']),
        'source_locations_country': ['US'],
        'categories_taxonomy': 'aylien',
        'aql': f'categories: ({cat_search_string}) AND entities:({{{{id:{data["location"]} AND overall_prominence:>=0.65}}}})',
        'not_entities_id' : ['N25240567620063168378490754444048642724'], #exclude sponsored
        'sort_by': 'relevance'
    }

    try:
        api_response = api_instance.list_stories(**opts)
        # json_data = json.dumps(opts, ensure_ascii=False).encode('utf-8')
        # api_response = api_instance.list_stories(body=json_data)
   
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
                'words_count': story.words_count
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
        return error_data
    # return 'success'