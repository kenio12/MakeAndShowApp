from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime
from typing import Optional, List

class App(BaseModel):
    name: str
    prefix_icon: str = Field(default="🗡️")
    suffix_icon: str = Field(default="🏴‍☠️")
    description: str
    demo_url: Optional[str] = None
    source_url: Optional[str] = None
    screenshots: List[HttpUrl] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    user_id: str

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