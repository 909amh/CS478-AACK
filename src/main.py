from flask import Flask, render_template, url_for, request
import os
import base64
from skimage.transform import resize
import tensorflow as tf
import numpy as np
from keras.preprocessing import image as image_utils
from PIL import Image
from model import Pokemon   # Importing the Pokemon class from the model module
from io import BytesIO

#Root Project Directory Path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#Templates Directory Path
template_dir = os.path.join(project_root, 'templates')
#Static Directory Path
static_dir = os.path.join(project_root, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir) # Creating a Flask app instance
model = tf.keras.models.load_model('model.h5') # Loading the pre-trained Keras model

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
    final_image = Image.new("RGB", image.size, "WHITE") # Creating a new image with a white background
    final_image.paste(image, (0, 0), image) # Pasting the original image onto the new image with white background
    final_image = final_image.resize((256, 256)) # Resizing the image to (256, 256)
    final_image = final_image.convert('RGB') # Converting image mode to RGB

    # Performing image processing
    final_image.show()
    
    image = image_utils.img_to_array(final_image) # Converting image to numpy array
    image = np.expand_dims(image, axis=0) # Adding an extra dimension to match model input shape

    prediction = model.predict(image) # Making prediction using the loaded model
    predicted_class = np.argmax(prediction) # Extracting the index of the predicted class
    predicted_class_name = Pokemon(predicted_class) # Instantiating a Pokemon object with the predicted class index
    print(predicted_class_name) # Printing the predicted Pokemon class name
    return str(predicted_class_name.name) # Returning the predicted Pokemon class name as a string


@app.route('/select')
def select():
    return render_template('select.html')

if __name__ == '__main__':
    app.run(debug=True)  # Running the Flask app in debug mode