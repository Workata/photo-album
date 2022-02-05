"""
{'category': 'cars', 'year': 2016, 'location': 'Greece', 'image_name': 'smth.jpg'}
Landscape, Cars, Flora, Birds, Wildlife 
"""
from tinydb import TinyDB, where, Query
from fastapi import APIRouter, Depends
from src.routers.auth import get_current_user
from fastapi.responses import FileResponse


CATEGORIES_DB_PATH = "./data/DB/categories.json"
CATEGORIES_DB = TinyDB(CATEGORIES_DB_PATH)

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.post("/add/{category}/{year}/{location}/{image_name}")
async def add_image_to_category(category : str, year : int, location : str, image_name : str, user: dict = Depends(get_current_user)):
    categories_query = CATEGORIES_DB.search(Query().fragment({'category': category, 'year': year, 'location': location, 'image_name': image_name}))
    if categories_query:
        return f"Picture {image_name} already exists in this category"
    CATEGORIES_DB.insert({'category': category, 'year': year, 'location': location, 'image_name': image_name})
    return f"Added new picture {image_name} to {category} category by {user['username']}"   # TODO change for response

@router.post("/delete/{category}/{year}/{location}/{image_name}")
async def delete_image_from_category(category : str, year : int, location : str, image_name : str, user: dict = Depends(get_current_user)):
    CATEGORIES_DB.remove(Query().fragment({'category': category, 'year': year, 'location': location, 'image_name': image_name}))
    return f"Removed picture {image_name} from {category} category by {user['username']}"   # TODO change for response

@router.get("/get/{year}/{location}/{image_name}")
async def get_image_categories(year : int, location : str, image_name : str):
    landscape_query = CATEGORIES_DB.search(Query().fragment({'category': 'landscape', 'year': year, 'location': location, 'image_name': image_name}))
    cars_query = CATEGORIES_DB.search(Query().fragment({'category': 'cars', 'year': year, 'location': location, 'image_name': image_name}))
    flora_query = CATEGORIES_DB.search(Query().fragment({'category': 'flora', 'year': year, 'location': location, 'image_name': image_name}))
    birds_query = CATEGORIES_DB.search(Query().fragment({'category': 'birds', 'year': year, 'location': location, 'image_name': image_name}))
    wildlife_query = CATEGORIES_DB.search(Query().fragment({'category': 'wildlife', 'year': year, 'location': location, 'image_name': image_name}))
    return {'landscape': landscape_query != [], 'cars': cars_query != [], 'flora': flora_query != [], 'birds': birds_query != [], 'wildlife': wildlife_query != []}

@router.get("/content/{category}/{img_id}")
async def get_image_from_category(category : str, img_id : int):
    categories_query = CATEGORIES_DB.search(where('category') == category)
    if not categories_query:
        return f"There is no image"
    image_data = categories_query[img_id-1]
    image_content = FileResponse(f"./data/images/{image_data['year']}/{image_data['location']}/{image_data['image_name']}")
    return image_content
