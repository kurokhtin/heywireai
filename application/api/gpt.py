import openai
import os
import wandb

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_story(style, source_links, entities, summary, words = 500):
    
    prompt = f"Generate a story and a title in the {style} style for the story you generate and put the title at the first row. The story should involves the following entities and original example. Please make sure the story you generate is at least {words} words long."
    entity_string = "\n".join([f"- {entity[0]}: {entity[1]}" for entity in entities])
    
    if summary:
        story_prompt = f"{prompt}\nOriginal example: {summary}\n Entities: {entity_string}\n\nBegin story:"
    else:
        story_prompt = f"{prompt}\n{entity_string}\n\nBegin story:"
    
    try:
        story_completions = openai.ChatCompletion.create(
        # story_completions = openai.Completion.create(
            # model = "text-davinci-003",
            model = "gpt-3.5-turbo",
            messages=[{"role": "user", "content": story_prompt}],
            # prompt = story_prompt,
            max_tokens=int(4000 - (len(story_prompt) / 3)),
        )
        run = wandb.init(project='HeywireAI', entity="heywire")
        prediction_table = wandb.Table(columns=["original_story", "prompt", "usage", "completion"])
        # prediction_table.add_data(list(source_links), story_prompt, story_completions['usage'], story_completions['choices'][0]['text'])
        prediction_table.add_data(list(source_links), story_prompt, story_completions['usage'], story_completions['choices'][0]['message']['content'])
        wandb.log({'predictions': prediction_table})
        wandb.finish()
        return story_completions['choices'][0]['message']['content']

    except Exception as e:
        print(f"Error: {str(e)}")
        return None
        # wandb.finish()
    # print(story_completions["usage"])
    
    # return story_completions['choices'][0]['text']