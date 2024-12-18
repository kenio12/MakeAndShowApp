from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.app import App
from pydantic import BaseModel

router = APIRouter()

class AppCreate(BaseModel):
    name: str
    description: str
    demo_url: str | None = None
    source_url: str | None = None

class AppResponse(BaseModel):
    id: int
    name: str
    description: str
    demo_url: str | None
    source_url: str | None

    class Config:
        from_attributes = True

@router.post("/apps/", response_model=AppResponse)
def create_app(app: AppCreate, db: Session = Depends(get_db)):
    db_app = App(**app.model_dump())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

@router.get("/apps/", response_model=List[AppResponse])
def get_apps(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    apps = db.query(App).offset(skip).limit(limit).all()
    return apps 