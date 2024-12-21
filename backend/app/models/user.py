from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, UTC
from typing import Optional

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    email: EmailStr
    username: str
    hashed_password: str
    is_active: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: Optional[datetime] = None
    is_verified: bool = False
    verification_token: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "email": "user@example.com",
                "username": "testuser",
                "hashed_password": "hashedpassword123",
                "is_active": False
            }
        }
        populate_by_name = True