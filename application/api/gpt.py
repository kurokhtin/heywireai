import openai
import os
import wandb
from . import error_handling

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_story(style, source_links, entities, summary, words = 500, best = 1):
    
    prompt = f"Generate a story and a title in the {style} style. For the title you generate put it at the first row and it should be short, one sentence is max. The story should involves the following entities and summary. Please make sure the story you generate is AT LEAST {words} WORDS LONG."
    entity_string = "\n".join([f"- {entity[0]}: {entity[1]}" for entity in entities])
    
    if summary:
        story_prompt = f"{prompt}\nSummary: {summary}\n Entities: {entity_string}\n\nBegin story:"
    else:
        story_prompt = f"{prompt}\n{entity_string}\n\nBegin story:"
    
    try:
        # story_completions = openai.ChatCompletion.create(
        #     model = "gpt-3.5-turbo",
        #     messages=[{"role": "user", "content": story_prompt}],
        #     max_tokens=int(4000 - (len(story_prompt) / 3)),
        # )
        story_completions = openai.Completion.create(
            model = "text-davinci-003",
            prompt = story_prompt,
            max_tokens=int(4000 - (len(story_prompt) / 3)),
            best_of = best
        )
        try:
            run = wandb.init(project='HeywireAI', entity="heywire")
            prediction_table = wandb.Table(columns=["original_story", "prompt", "usage", "completion"])
            # prediction_table.add_data(list(source_links), story_prompt, story_completions['usage'], story_completions['choices'][0]['message']['content'])
            prediction_table.add_data(list(source_links), story_prompt, story_completions['usage'], story_completions['choices'][0]['text'])
            wandb.log({'predictions': prediction_table})
            wandb.finish()
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            error_handling.log_error(error_msg)

        # return story_completions['choices'][0]['message']['content']
        return story_completions['choices'][0]['text']

    except Exception as e:
        error_msg = f"Error: {str(e)}"
        error_handling.log_error(error_msg)
        return None
        # wandb.finish()
    # print(story_completions["usage"])
    
    # return story_completions['choices'][0]['text']