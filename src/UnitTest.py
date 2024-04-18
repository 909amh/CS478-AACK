import unittest
from image_silhoutter import ImageSilhouetter
from tensorflow.keras.models import load_model
import cv2
import numpy as np

class UnitTesting(unittest.TestCase):

    def test_silhouette(self):
        # silhouetter = ImageSilhouetter()
        # first_image = np.asarray(silhouetter.silhouette(cv2.imread("images/001.png")))
        # second_image = np.asarray(cv2.imread("silhouetted_images/001.png/001.png"))
        # equality = np.array_equal(first_image, second_image)
        # self.assertTrue(equality)
        pass

    def testModel(self):
        model = load_model("model.h5")
        imageToPredict: np.array = cv2.imread("silhouetted_images/001.png/001.png")
        result = model.predict(imageToPredict.reshape(1, 256, 256, 3))
        print(result[0][0])
        self.assertTrue(result[0][0] == 1.0)
    

if __name__ == '__main__':
    unittest.main()