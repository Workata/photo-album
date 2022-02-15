from fastapi import APIRouter, File, UploadFile, Depends
from fastapi.responses import FileResponse
import os
from typing import List
# from PIL import Image
import shutil
from src.utils.thumbnailsGenerator import create_thumbnails
from src.utils.general import create_dir_if_not_exists
from src.routers.auth import get_current_user

router = APIRouter(prefix="/api/images", tags=["Images"])

@router.get("/content/{year}/{location}/{img_id}")
async def get_image_content(year : str, location : str, img_id : int):
    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")
        return None

    # * img id valdiation
    if img_id > len(all_images)  or img_id < 1:
        print("index out of range")
        # set default value
        img_id = 1

    # img_id: 1, 2, 3, 4, ...
    image_name = all_images[img_id-1]
    image_content = FileResponse(f"./data/images/{year}/{location}/{image_name}")
    return image_content

@router.get("/names/{year}/{location}")
async def get_images_names(year : str, location : str):
    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")
        return {"img_names": []}

    # img_id: 1, 2, 3, 4, ...
    all_images = [img for img in all_images]  # img.split('.')[0]
    return {"img_names": all_images}

@router.get("/thumbnails/{year}/{location}")
async def get_images_thumbnails(year : str, location : str):
    """ 
    TODO send it with one request
    https://stackoverflow.com/questions/61163024/return-multiple-files-from-fastapi
    """
    path = f"./data/imagesThumbs/{year}/{location}"
    try:
        all_thumbs = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
    # ! this is wrong, it should be zipped
    all_thumbs = [FileResponse(f"./data/imagesThumbs/{year}/{location}/{thumb}") for thumb in all_thumbs]
    return all_thumbs
    # return {"all_thumbs": all_thumbs}

@router.get("/thumbnail/{year}/{location}/{img_id}")
async def get_images_thumbnails(year : str, location : str, img_id : int):
    path = f"./data/imagesThumbs/{year}/{location}"
    try:
        all_thumbnails = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
    thumbnail_name = all_thumbnails[img_id-1]
    thumbnail_content = FileResponse(f"./data/imagesThumbs/{year}/{location}/{thumbnail_name}")
    return thumbnail_content

@router.post("/upload/{year}/{location}") 
async def upload_images(year : str, location : str, new_pictures: List [UploadFile] = File(...), user: dict = Depends(get_current_user)): 
    """
    probably not needed anymore
    """
    path = f"./data/images/{year}/{location}"
    create_dir_if_not_exists(path)
    for image in new_pictures:
        with open(f"{path}/{image.filename}", "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    create_thumbnails(path)

    return f"Added new photos by {user['username']}"

