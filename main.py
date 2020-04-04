from flask import Flask, jsonify
from flaskwebgui import FlaskUI
from flask_cors import CORS

from pip_gui.pypi import search_pypi, get_package

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r'/*': {'origins': 'http://localhost:8080'}})

ui = FlaskUI(app)


@app.route("/api/search/<string:query>")
def index(query):
    """
    Search PyPi API
    """
    return jsonify(search_pypi(query))


@app.route("/api/package/<string:package_name>")
def package(package_name):
    return jsonify(get_package(package_name))


if __name__ == '__main__':
    ui.run()
