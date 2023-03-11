from flask import Flask
from application.api.routes import api
from flask_cors import CORS
import os

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')
CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == '__main__':
    if os.environ.get('FLASK_ENV') == 'development':
        app.run(debug=True)
    else:
        app.run()