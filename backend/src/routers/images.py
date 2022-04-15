"""
    TODO module docstring
"""
from typing import List
from tinydb import TinyDB, Query
from fastapi import APIRouter, File, UploadFile, Depends
from fastapi.responses import FileResponse
from PIL import Image
from src.utils.thumbnailsGenerator import create_thumbnails
from src.utils.general import create_dir_if_not_exists
from src.routers.auth import get_current_user


router = APIRouter(prefix="/api/images", tags=["Images"])

IMAGES_ORDER_DB_PATH = "./data/DB/imagesOrder.json"
IMAGES_ORDER_DB = TinyDB(IMAGES_ORDER_DB_PATH)

@router.get("/content/{year}/{location}/{img_id}")
async def get_image_content(year : str, location : str, img_id : int):
    """
    TODO docstring
    """
    images_order_query = IMAGES_ORDER_DB.search(Query().fragment(
     {'year': year, 'location': location}))
    if not images_order_query:
        print("This folder doesn't exist (probably)")
        return None

    images_order = images_order_query[0]['order']

    # img_id: <1, N>
    image_name = images_order[str(img_id)]
    image_content = FileResponse(f"./data/images/{year}/{location}/{image_name}")
    return image_content

@router.get("/names/{year}/{location}")
async def get_images_names(year : str, location : str):
    """
    TODO docstring
    """
    images_order_query = IMAGES_ORDER_DB.search(Query().fragment(
     {'year': year, 'location': location}))
    if not images_order_query:
        print("This folder doesn't exist (probably)")
        return {"img_names": []}
    images_names = []
    images_order = images_order_query[0]['order']

    for i in range(1, len(images_order) + 1):
        images_names.append(images_order[str(i)])

    return {"img_names": images_names}

@router.get("/count/{year}/{location}")
async def get_images_count(year : str, location : str):
    """
    TODO docstring
    """
    images_order_query = IMAGES_ORDER_DB.search(Query().fragment(
     {'year': year, 'location': location}))
    if not images_order_query:
        print("This folder doesn't exist (probably)")
        return {"img_names": []}
    images_order = images_order_query[0]['order']

    return {"number_of_images": len(images_order)}

@router.get("/thumbnail/{year}/{location}/{img_id}")
async def get_image_thumbnail(year : str, location : str, img_id : int):
    """
    TODO docstring
    """
    images_order_query = IMAGES_ORDER_DB.search(Query().fragment(
     {'year': year, 'location': location}))
    if not images_order_query:
        print("This folder doesn't exist (probably)")
        return None

    images_order = images_order_query[0]['order']

    # * img_id: <1, N>
    thumbnail_name = images_order[str(img_id)]
    thumbnail_content = FileResponse(f"./data/imagesThumbs/{year}/{location}/{thumbnail_name}")
    return thumbnail_content

@router.post("/upload/{year}/{location}")
def upload_images(year : str, location : str,
 new_pictures: List [UploadFile] = File(...), user: dict = Depends(get_current_user)):
    """
    TODO docstring
    """
    images_order = {}

    for idx, image in enumerate(new_pictures):
        images_order[idx + 1] = image.filename
        print(image.filename)   # this is ok

    IMAGES_ORDER_DB.insert({'year': year,
     'location': location, 'order': images_order})

    path = f"./data/images/{year}/{location}"
    create_dir_if_not_exists(path)
    for image in new_pictures:
        img = Image.open(image.file)
        img.save(f"{path}/{image.filename}")

    create_thumbnails(path)

    return f"Added new photos by {user['username']}"


