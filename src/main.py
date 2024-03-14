from flask import Flask, render_template, url_for
import os

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
template_dir = os.path.join(project_root, 'templates')
static_dir = os.path.join(project_root, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)