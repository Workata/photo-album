"""
{'year': 2016, 'location': Greece}

"""
from tinydb import TinyDB, Query
from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

LOCATIONS_DB_PATH = "./data/DB/locations.json"
LOCATIONS_DB = TinyDB(LOCATIONS_DB_PATH)

router = APIRouter(prefix="/api/locations", tags=["Locations"])

# db.insert({'name': 'John', 'age': 22})


@router.get("/years")
async def get_years():
    all_locations = LOCATIONS_DB.all()
    unique_years = []
    for location in all_locations:
        if location['year'] not in unique_years:
            unique_years.append(location['year'])
    return unique_years

def one_time_insert():
    LOCATIONS_DB.insert({'year': 2015, 'location': 'Croatia'})
    LOCATIONS_DB.insert({'year': 2015, 'location': 'England'})
    LOCATIONS_DB.insert({'year': 2016, 'location': 'Germany'})
    LOCATIONS_DB.insert({'year': 2016, 'location': 'Poland'})

# one_time_insert()

