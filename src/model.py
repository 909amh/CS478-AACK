import numpy as np
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

if (__name__ == "__main__"):

    class_names = [""]
    num_classes = len(class_names)

    print("Building Model...")
    model = Sequential([
        layers.Rescaling(1./255, input_shape=(256, 256, 3)),
        layers.Conv2D(16, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(32, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes)
    ])

    data_dir = "silhouetted_images/"
    dataset = tf.keras.utils.image_dataset_from_directory(data_dir, batch_size=512, shuffle=True, seed=1, image_size=(256,256))
    dataset = dataset.map(lambda x,y: (x/256, y))
    print("Type" + str(type(dataset)))
    print(dataset.as_numpy_iterator().next())
