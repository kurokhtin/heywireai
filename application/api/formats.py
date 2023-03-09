from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

def get_summary(article, count):
    LANGUAGE = "english"
    SENTENCES_COUNT = count

    parser = PlaintextParser.from_string(article, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    summary = " ".join(str(sentence) for sentence in summarizer(parser.document, SENTENCES_COUNT))
    return summary

def convert_story(story):
    converted = {
        'text': get_summary(story.body, 8), 
        'entrities': format_entities(story.entities), 
        'links': story.links.permalink,
        'authors': story.author.name,
        'thumbnails':  story.media[0].url if len(story.media) > 0 else None
    }
    
    if story.author.name != "":
        converted['text'] = clean_text_author(story.author.name, converted['text'])
        converted['entrities'] = clean_ents_author(story.author.name, converted['entrities'])

    return converted

def format_entities(ents):
    ents_output = [
        (entity.body.surface_forms[0].text, entity.types[0], entity.overall_frequency)
        for entity in ents
        if len(entity.body.surface_forms) > 0 and len(entity.types) > 0 and isinstance(entity.overall_frequency, (int, float))
    ]
    
    if len(ents_output) > 30:
        ents_output = [item[:2] for item in ents_output if item[2] > 1]
    else:
        ents_output = [item[:2] for item in ents_output]
        
    return ents_output

def clean_ents_author(author, ents):
    for entity in ents:
        if author in entity:
            ents.remove(entity)    
    return ents

def clean_text_author(author, text):
    if author is None:
        return text

    while author in text:
        text = text.replace(author, "")
    return text

def combine_story(story_with_relatives):
    combined_story = {
        'text': '',
        'entities': set(),
        'links': set(),
        'authors': set(),
        'thumbnails': set()
    }

    for d in story_with_relatives:
        combined_story['text'] += d['text']
        combined_story['entities'].update(d['entrities'])
        combined_story['links'].add(d['links'])
        combined_story['authors'].add(d['authors'])
        combined_story['thumbnails'].add(d['thumbnails'])

    return combined_story