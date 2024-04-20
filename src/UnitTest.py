import unittest
from image_silhoutter import ImageSilhouetter
from tensorflow.keras.models import load_model
import cv2
import numpy as np

class UnitTesting(unittest.TestCase):

    def test_silhouette(self):
        # silhouetter = ImageSilhouetter() # Creating an instance of ImageSilhouetter
        # first_image = np.asarray(silhouetter.silhouette(cv2.imread("images/001.png"))) # Generating silhouette for the first image
        # second_image = np.asarray(cv2.imread("silhouetted_images/001.png/001.png")) # Reading the silhouette image
        # equality = np.array_equal(first_image, second_image) # Checking if the generated silhouette matches the expected silhouette
        # self.assertTrue(equality) # Asserting that the generated silhouette matches the expected silhouette

        pass #no test is currently implemented

    def testModel(self):
         # Testing model prediction
        model = load_model("model.h5") # Loading the trained model
        imageToPredict: np.array = cv2.imread("silhouetted_images/001.png/001.png") # Reading the input image for prediction
        result = model.predict(imageToPredict.reshape(1, 256, 256, 3)) # Making predictions on the input image
        print(result[0][0]) # Printing the prediction result
        self.assertTrue(result[0][0] == 1.0) # Asserting that the prediction result is equal to 1.0
    

if __name__ == '__main__':
    unittest.main() # Running the unit tests