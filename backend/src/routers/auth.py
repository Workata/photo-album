from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from tinydb import TinyDB, where
from datetime import timedelta, datetime
from passlib.hash import bcrypt
from typing import Optional
from jose import JWTError, jwt


USERS_DB_PATH = "./data/DB/users.json"
USERS_DB = TinyDB(USERS_DB_PATH)

SECRET_KEY = "7505d3e581d01c02fd31667cdc67cdb64173a9d4f715e73bf0a8e196fa02a15c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440   # 60x24 = 1day ,30

router = APIRouter(prefix="/api/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    TODO function docstring
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        if username is None:
            raise credentials_exception
    except JWTError as jwt_error:
        raise credentials_exception from jwt_error
    users = USERS_DB.search(where('username') == username)
    if not users:
        raise credentials_exception
    return users[0]

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    TODO function docstring
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    TODO function docstring
    """
    users_list = USERS_DB.search(where('username') == form_data.username)

    if not users_list:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_dict = users_list[0] # should be only one user with this username

    if not bcrypt.verify(form_data.password, user_dict['hashed_password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user_dict["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def add_dummy_user():
    hashed_password = bcrypt.hash('1234')
    USERS_DB.insert({'username': 'tomtol', 'hashed_password': hashed_password})

# add_dummy_user()