import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import pandas as pd
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential

if (__name__ == "__main__"):

    

    # Get the dataset
    data_dir = "silhouetted_images/"
    dataset = tf.keras.utils.image_dataset_from_directory(data_dir, batch_size=512, shuffle=True, seed=1, image_size=(256,256))

    num_of_classes = len(dataset.class_names)
    print("Number of Classes: " + str(num_of_classes))
    # Set validation and training sizes
    train_size = int(num_of_classes)
    val_size = int(num_of_classes*.2)
    print("Train size: " + str(train_size))
    print("Val size: " + str(val_size))


    train: tf.data.Dataset = dataset
    val = dataset.take(val_size)

    def one_hot_encode(image, label):
        label = tf.one_hot(label, depth=151)
        return image, label

    train = train.map(one_hot_encode)
    val = val.map(one_hot_encode)

    model = tf.keras.models.Sequential(layers.Conv2D(64, (3,3), activation='relu', input_shape=(256, 256, 3)))
    model.add(layers.MaxPooling2D(2, 2))
    model.add(layers.Conv2D(64, (3,3), activation='relu'))
    model.add(layers.MaxPooling2D(2,2))
    model.add(layers.Conv2D(128, (3,3), activation='relu'))
    model.add(layers.MaxPooling2D(2,2))
    model.add(layers.Conv2D(128, (3,3), activation='relu'))
    model.add(layers.MaxPooling2D(2,2))
    model.add(layers.Flatten())
    model.add(layers.Dropout(0.5))
    model.add(layers.Dense(151, activation='softmax'))

    model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])


    hist = model.fit(train, epochs=25, validation_data=val)
    print(hist)


    fig = plt.figure()
    plt.plot(hist.history['loss'], color='teal', label='loss')
    plt.plot(hist.history['val_loss'], color='orange', label='val_loss')
    plt.plot(hist.history['accuracy'], color='red', label='accuracy')
    plt.plot(hist.history['val_accuracy'], color='blue', label='val_accuracy')
    fig.suptitle('Loss and Accuracy', fontsize = 20)
    plt.legend(loc='best')
    plt.show()
    model.save("model.h5")
