from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path
import os



router = APIRouter(prefix="/api/images", tags=["Images"])

@router.get("/view/{year}/{location}/{img_id}")
async def get_image(year : str, location : str, img_id : int):
    # filename = user["profile_picture"]
    #path = get_profile_picture_path(filename if filename is not None else "default.png")
    print("Directory Path:", Path().absolute()) # /backend

    path = f"./data/images/{year}/{location}"
    try:
        all_images = os.listdir(path)   # returns list of files (names)
    except:
        print("This folder doesn't exist (probably)")

    # img_id: 1, 2, 3, 4, ...
    image_name = all_images[img_id-1]

    return FileResponse(f"./data/images/{year}/{location}/{image_name}")

    # return {"year": year, "location": location, "id": img_id}