from flask import Flask, jsonify, render_template, send_from_directory
from flaskwebgui import FlaskUI
from flask_cors import CORS

from pip_gui.pypi import search_pypi, get_package

DEBUG = False

app = Flask(__name__, static_url_path='/static')
app.config.from_object(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

ui = FlaskUI(app)


# Serve static files
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/css', path)


@app.route("/api/search/<string:query>")
def index(query):
    """
    Search PyPi API
    """
    return jsonify(search_pypi(query))


@app.route("/api/package/<string:package_name>")
def package(package_name):
    return jsonify(get_package(package_name))


@app.route("/")
def homepage():
    return render_template("index.html")


if __name__ == '__main__':
    ui.run()
