from PIL import Image
import os

THUMBNAIL_SIZE = 180 # 90

def generate_thumb_path(img_path):
    """
    Create new dir if not created
    """
    thumb_img_path = img_path.replace("images", "imagesThumbs")
    return thumb_img_path

def create_thumbnail(img_path):
    image = Image.open(img_path)
    image.thumbnail((THUMBNAIL_SIZE, THUMBNAIL_SIZE))
    thumb_img_path = generate_thumb_path(img_path)
    image.save(thumb_img_path)      

def create_thumbnails(dir_path):
    """
        TODO docstring
        dir_path - path to directory with original images
    """
    all_images = os.listdir(dir_path)   # returns list of files (names)
    for img in all_images:
        img_path = f"{dir_path}/{img}"
        create_thumbnail(img_path)
        # img_name = img.split(".")[0]
        # img_extension = img.split(".")[1]


create_thumbnails("./backend/data/images/2015/Croatia")