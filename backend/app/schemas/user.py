from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(BaseModel):
    message: str
    user: dict

    class Config:
        json_schema_extra = {
            "example": {
                "message": "User created successfully",
                "user": {
                    "id": "123",
                    "email": "user@example.com",
                    "username": "username"
                }
            }
        }