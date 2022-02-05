"""
{'year': 2016, 'location': Greece}

"""
from tinydb import TinyDB, where
from fastapi import APIRouter, Depends
from src.routers.auth import get_current_user
from fastapi.responses import FileResponse

LOCATIONS_DB_PATH = "./data/DB/locations.json"
LOCATIONS_DB = TinyDB(LOCATIONS_DB_PATH)

router = APIRouter(prefix="/api/locations", tags=["Locations"])

@router.get("/years")
async def get_years():
    all_locations = LOCATIONS_DB.all()
    unique_years = []
    for location in all_locations:
        if location['year'] not in unique_years:
            unique_years.append(location['year'])
    unique_years.sort()
    return unique_years

@router.post("/create/year/{year}")
async def create_year(year : int, user: dict = Depends(get_current_user)):
    locations_query = LOCATIONS_DB.search(where('year') == year)
    if locations_query:
        return f"Year {year} already exists"
    LOCATIONS_DB.insert({'year': year})
    return f"Added new year {year} by {user['username']}" # TODO change for response

@router.get("/{year}")
async def get_locations(year : int):
    locations_query = LOCATIONS_DB.search(where('year') == year)
    locations = []
    for location_row in locations_query:
        if 'location' not in location_row:  # only year exists
            continue
        locations.append(location_row['location'])
    locations.sort()
    return locations

@router.post("/create/location/{year}/{location}")
async def create_year(year : int, location : str, user: dict = Depends(get_current_user)):
    locations_query = LOCATIONS_DB.search(where('year') == year and where('location') == location)
    if locations_query:
        return f"Location {location} in year {year} already exists"
    LOCATIONS_DB.insert({'year': year, 'location': location})
    return f"Added new location {location} in year {year} by {user['username']}" # TODO change for response

def one_time_insert():
    LOCATIONS_DB.insert({'year': 2015, 'location': 'Croatia'})
    LOCATIONS_DB.insert({'year': 2015, 'location': 'England'})
    LOCATIONS_DB.insert({'year': 2016, 'location': 'Germany'})
    LOCATIONS_DB.insert({'year': 2016, 'location': 'Poland'})

# one_time_insert()

