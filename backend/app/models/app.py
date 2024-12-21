from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class AppCreate(BaseModel):
    title: str
    description: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    app_types: list[str] = []
    prefix_icon: str = Field(default="🗡️")
    suffix_icon: str = Field(default="🏴‍☠️")
    screenshots: List[str] = Field(default_factory=list)
    user_id: str

class App(AppCreate):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "My App",
                "prefix_icon": "🗡️",
                "suffix_icon": "🏴‍☠️",
                "description": "This is my awesome app",
                "demo_url": "https://demo.example.com",
                "source_url": "https://github.com/example/myapp",
                "screenshots": [
                    "https://example.com/screenshots/1.jpg",
                    "https://example.com/screenshots/2.jpg"
                ],
                "user_id": "507f1f77bcf86cd799439011"
            }
        }