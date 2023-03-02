import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk
import spacy
from pprint import pprint

def text_to_ents(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    unique_names = set([ent.text.lower() for ent in doc.ents])
    unique_ents = []
    for n in unique_names:
        appended = False
        for X in doc.ents:
            if X.text.lower() in n and appended == False and (X.text.lower(), X.label_) not in unique_ents:
                unique_ents.append((X.text.lower(), X.label_))
                appended = True
    return unique_ents

def text_to_events(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    events = []
    for sentence in doc.sents:
        for token in sentence:
            if token.pos_ == "VERB":
                entities = []
                for child in token.children:
                    if child.ent_type_:
                        entities.append(child.text)
                events.append((token.lemma_, entities))
    return events