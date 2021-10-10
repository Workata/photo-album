"""
{'url': 'http://localhost:3000/2016/Germany/1', 'latitude': '42.012043', 'longitude': '32.012443'}

"""
from tinydb import TinyDB, where, Query
from fastapi import APIRouter, Depends, Form
from src.routers.auth import get_current_user

MAP_DB_PATH = "./data/DB/map.json"
MAP_DB = TinyDB(MAP_DB_PATH)

router = APIRouter(prefix="/api/map", tags=["Map"])

@router.get("/markers")
async def get_markers():
    all_markers = MAP_DB.all()
    return all_markers

@router.post("/create/marker")
async def create_marker(url: str = Form(...), latitude: str = Form(...), longitude: str = Form(...), user: dict = Depends(get_current_user)):
    marker_query = MAP_DB.search(Query().fragment({'latitude': latitude, 'longitude': longitude}))
    if marker_query:
        return f"Marker on position {latitude} (lat) {longitude} (lon) already exists" # TODO change for response
    MAP_DB.insert({'url': url, 'latitude': latitude, 'longitude': longitude})
    return f"Added marker: {url}, {latitude}, {longitude}" # TODO change for response

@router.post("/delete/marker")
async def delete_marker(latitude: str = Form(...), longitude: str = Form(...), user: dict = Depends(get_current_user)):
    marker_query = MAP_DB.search(Query().fragment({'latitude': latitude, 'longitude': longitude}))
    if not marker_query:
        return f"Marker on position {latitude} (lat) {longitude} (lon) doesn't exist" # TODO change for response
    MAP_DB.remove(Query().fragment({'latitude': latitude, 'longitude': longitude}))
    return f"Removed marker from {latitude} (lat), {longitude} (lon)" # TODO change for response



