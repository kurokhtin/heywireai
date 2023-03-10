# import os

# import openai
# from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask import Flask
from application.api.routes import api
from flask_cors import CORS
# import logging

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# handler = logging.FileHandler('error.log')
# handler.setLevel(logging.ERROR)
# app.logger.addHandler(handler)

# openai.api_key = os.getenv("OPENAI_API_KEY")


# @app.route("/", methods=("GET", "POST"))
# def index():
    # if request.method == "POST":
    #     animal = request.form["animal"]
    #     response = openai.Completion.create(
    #         model="text-davinci-003",
    #         prompt=generate_prompt(animal),
    #         temperature=0.6,
    #     )
    #     return redirect(url_for("index", result=response.choices[0].text))

    # result = request.args.get("result")
    # return render_template("index.html", result=result)
    # return jsonify({'message': 'Hello World!'})


# def generate_prompt(animal):
#     return """Suggest three names for an animal that is a superhero.

# Animal: Cat
# Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
# Animal: Dog
# Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
# Animal: {}
# Names:""".format(
#         animal.capitalize()
#     )
if __name__ == '__main__':
    app.run(debug=True)