"""
    TODO docstring
"""
import os
from datetime import timedelta, datetime
from typing import Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from tinydb import TinyDB, where
from passlib.hash import bcrypt
from jose import JWTError, jwt
from dotenv import load_dotenv
import requests

load_dotenv()

USERS_DB_PATH = "./data/DB/users.json"
USERS_DB = TinyDB(USERS_DB_PATH)

# ! using HS256 the secret key should be
# ! at least 32 chars but the longer the better (base64url-encode)
SECRET_KEY = os.getenv('SECRET_KEY_LOGIN_TOKEN')
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


def validate_human(recaptcha_value: str):
    """
    TODO function docstring
    """
    secret_recaptcha_token = os.getenv('SECRET_KEY_GOOGLE_RECAPTCHA')
    response = requests.post("https://www.google.com/recaptcha/api/" +
        f"siteverify?secret={secret_recaptcha_token}&response={recaptcha_value}")
    data = response.json()
    return data["success"]

@router.post("/login")
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    TODO function docstring
    """
    # * validate ReCaptcha
    if not validate_human(form_data.scopes[0]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="BOT",
            headers={"WWW-Authenticate": "Bearer"},
        )

    users_list = USERS_DB.search(where('username') == form_data.username)

    if not users_list:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password!",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_dict = users_list[0] # should be only one user with this username

    if not bcrypt.verify(form_data.password, user_dict['hashed_password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password!",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user_dict["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
