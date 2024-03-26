from flask import Flask, render_template, url_for
import os

#Root Project Directory Path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#Templates Directory Path
template_dir = os.path.join(project_root, 'templates')
#Static Directory Path
static_dir = os.path.join(project_root, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/drawings')
def canvas():
    return render_template('drawings.html')

if __name__ == '__main__':
    app.run(debug=True)