from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path
import os
from os.path import basename
import json



router = APIRouter(prefix="/api/images", tags=["Images"])

@router.get("/content/{year}/{location}/{img_id}")
async def get_image_content(year : str, location : str, img_id : int):
    # print("Directory Path:", Path().absolute()) # /backend
    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # * img id valdiation
    if img_id > len(all_images)  or img_id < 1:
        print("index out of range")
        # set default value
        img_id = 1

    # img_id: 1, 2, 3, 4, ...
    image_name = all_images[img_id-1]
    image_content = FileResponse(f"./data/images/{year}/{location}/{image_name}")
    return image_content

# ! not used for now, upgraded to get_images_names
@router.get("/name/{year}/{location}/{img_id}")
async def get__image_name(year : str, location : str, img_id : int):
    # print("Directory Path:", Path().absolute()) # /backend
    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # * img id valdiation
    if img_id > len(all_images)  or img_id < 1:
        print("index out of range")
        # set default value
        img_id = 1

    # img_id: 1, 2, 3, 4, ...
    image_name = all_images[img_id-1].split('.')[0]
    return {"img_name": image_name}

@router.get("/names/{year}/{location}")
async def get_images_names(year : str, location : str):
    # print("Directory Path:", Path().absolute()) # /backend
    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
    all_images = [img.split('.')[0] for img in all_images]
    return {"img_names": all_images}

@router.get("/thumbnails/{year}/{location}")
async def get_images_thumbnails(year : str, location : str):
    """ 
    TODO send it with one request
    """
    # print("Directory Path:", Path().absolute()) # /backend
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
    # print("Directory Path:", Path().absolute()) # /backend
    path = f"./data/imagesThumbs/{year}/{location}"
    try:
        all_thumbnails = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
    thumbnail_name = all_thumbnails[img_id-1]
    thumbnail_content = FileResponse(f"./data/imagesThumbs/{year}/{location}/{thumbnail_name}")
    return thumbnail_content


@router.get("/count/{year}/{location}")
async def get_image_count(year : str, location : str):
    """
    probably not needed anymore
    """
    # print("Directory Path:", Path().absolute()) # /backend

    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    number_of_images = len(all_images)

    return {"ImageCount": number_of_images}

