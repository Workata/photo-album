from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
import os
from typing import List

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
    all_images = [img.split('.')[0] for img in all_images]
    return {"img_names": all_images}

@router.get("/thumbnails/{year}/{location}")
async def get_images_thumbnails(year : str, location : str):
    """ 
    TODO send it with one request
    """
    path = f"./data/imagesThumbs/{year}/{location}"
    try:
        all_thumbs = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
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

# add token
@router.post("/upload") # /{year}/{location} , year : str, location : str
async def upload_images(new_pictures: List [UploadFile] = File(...)): # List [UploadFile]
    """
    probably not needed anymore
    """
    for img in new_pictures:
        print(img.filename)
    # print("XD")
    # print(new_pictures.filename)
    # for image in images:
    #     print(image)

    return "ok"

