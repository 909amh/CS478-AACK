from flask import Flask, render_template, url_for, request
import os
import base64
from skimage.transform import resize
import tensorflow as tf
import numpy as np
from keras.preprocessing import image as image_utils
from PIL import Image
from model import Pokemon
from io import BytesIO

#Root Project Directory Path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#Templates Directory Path
template_dir = os.path.join(project_root, 'templates')
#Static Directory Path
static_dir = os.path.join(project_root, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
model = tf.keras.models.load_model('model.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/canvas')
def canvas():
    return render_template('canvas.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    dataURL = data['dataURL']

    header, base64_data = dataURL.split(',', 1)
    image = base64.b64decode(base64_data)

    image = Image.open(BytesIO(image))
    final_image = Image.new("RGB", image.size, "WHITE")
    final_image.paste(image, (0, 0), image)
    final_image = final_image.resize((256, 256))
    final_image = final_image.convert('RGB')

    final_image.show()
    
    # image = image.resize(resample=Image.Resampling.BOX, size = (256, 256))
    
    image = image_utils.img_to_array(final_image)
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    predicted_class = np.argmax(prediction)
    predicted_class_name = Pokemon(predicted_class)
    print(predicted_class_name)
    return str(predicted_class_name.name)


if __name__ == '__main__':
    app.run(debug=True)