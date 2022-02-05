from PIL import Image
import os
from src.utils.general import create_dir_if_not_exists

THUMBNAIL_SIZE = 180 # 90

def generate_thumb_path(img_path):
    """
    TODO Docstring
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
    thumb_dir_path = dir_path.replace("images", "imagesThumbs")
    create_dir_if_not_exists(thumb_dir_path)
    all_images = os.listdir(dir_path)   # returns list of files (names)
    for img in all_images:
        img_path = f"{dir_path}/{img}"
        create_thumbnail(img_path)
