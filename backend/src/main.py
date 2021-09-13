from typing import Optional

from fastapi import FastAPI

from src.routers import images, locations, auth

# https://fastapi.tiangolo.com/tutorial/bigger-applications/
app = FastAPI()
app.include_router(images.router)
app.include_router(locations.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
  return {"item_id": item_id, "q": q}