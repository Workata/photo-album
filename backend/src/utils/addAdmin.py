"""
    TODO module docstring
"""
import sys
from tinydb import TinyDB
from passlib.hash import bcrypt

USERS_DB_PATH = "./data/DB/users.json"
USERS_DB = TinyDB(USERS_DB_PATH)

def add_admin(username, password):
    """
    TODO function docstring
    """
    hashed_password = bcrypt.hash(password)
    USERS_DB.insert({'username': username, 'hashed_password': hashed_password})

add_admin(sys.argv[1], sys.argv[2])
