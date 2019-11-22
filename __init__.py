"""
    This file is an example of how to produce a viz application for twitter
    dataset
"""
from flask import Flask  
from flask import render_template

app = Flask(__name__)

@app.route("/")
def home():
    """
    This function is the core of the app
    Here we uses the render_template function of flask that will automatically
    render the html files present in the folder "templates" in the same
    directory as this file

    /app
        /__init__.py
        /templates
            /hello.html
    """
    return render_template("home.html")

@app.route("/template")
def template_app():
    return render_template("template_app.html")

if __name__ == "__main__":
    """
    With this we declare that the api runs if the file is called.
    """
    app.run(host='0.0.0.0',port=5000, debug=True)
