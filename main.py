from flask import Flask, jsonify

from pip_gui.pypi import search_pypi

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

app = Flask(__name__)


@app.route("/search/<string:query>")
def index(query):
    """
    Search PyPi API
    """
    return jsonify(search_pypi(query))


if __name__ == '__main__':
    app.run()
