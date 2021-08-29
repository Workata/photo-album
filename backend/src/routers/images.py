from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/api/images", tags=["Images"])

@router.get("/view/{year}/{location}/{img_id}")
async def get_image(year : str, location : str, img_id : int):
    # filename = user["profile_picture"]
    #path = get_profile_picture_path(filename if filename is not None else "default.png")
    print("Directory Path:", Path().absolute()) # backend

    return FileResponse("./data/images/2015/Croatia/test_img.jpg")

    # return {"year": year, "location": location, "id": img_id}