import cv2
import numpy as np

class ImageSilhouetter:
    def __init__(self):
        pass

    def silhoutte(self, image: np.ndarray) -> np.ndarray:

        # Convert the image to gray scale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Mask image
        # mask = image[:, 3] != 0
        # image[mask] = [0, 0, 0, 255]
        # Grayscale the image in the reverse colorway as intended
        image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV)[1]

        # Invert the image

        return image
    

def main():
    # Initialize the ImageSilouetter
    silhouetter = ImageSilhouetter()

    # Create a gray scale of the image
    image = silhouetter.silhoutte(cv2.imread("images/898.png"))
    
    cv2.imshow('Image',image)
    cv2.waitKey(0)



if (__name__ == "__main__"):
    main()