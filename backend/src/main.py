"""
	TODO docstring
"""
from fastapi import FastAPI

from src.routers import images, locations, auth, categories, imagesMap

# https://fastapi.tiangolo.com/tutorial/bigger-applications/
app = FastAPI()
app.include_router(images.router)
app.include_router(locations.router)
app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(imagesMap.router)

@app.get("/")
def test_connection():
    """
		Test connection
	"""
    return {"Connected": True}
