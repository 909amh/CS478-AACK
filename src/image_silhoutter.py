import cv2
import numpy as np

class ImageSilhouetter:
    def __init__(self):
        pass

    def silhoutte(self, image: np.ndarray) -> np.ndarray:

        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return image
    

def main():
    silhouetter = ImageSilhouetter()
    image = silhouetter.silhoutte(cv2.imread("images/088.png"))
    image = cv2.threshold(image, 170, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    image = cv2.bitwise_not(image)
    cv2.imshow('Image',image)
    cv2.waitKey(0)



if (__name__ == "__main__"):
    main()