import cv2
import os
import numpy as np

class ImageSilhouetter:
    def __init__(self):
        pass

    def silhouette(self, image: np.ndarray) -> np.ndarray:

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
    image = silhouetter.silhouette(cv2.imread("images/898.png"))
    directory = "images"
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            filepath = os.path.join(directory, filename)
            image = silhouetter.silhouette(cv2.imread(filepath))
            
            # Save the silhouette image
            if os.path.exists("silhouetted_images") == False:
                os.mkdir("silhouetted_images")
    
            cv2.imwrite(os.path.join("silhouetted_images", "silhouette_" + filename), image)
    



if (__name__ == "__main__"):
    main()