from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..database import get_db
from ..models.app import App
from datetime import datetime
from bson import ObjectId
import json

router = APIRouter()

# ObjectIdをJSON形式に変換するためのヘルパー関数
def serialize_object_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

@router.post("/apps/")
async def create_app(app: App, db = Depends(get_db)):
    app_dict = app.model_dump()
    app_dict["created_at"] = datetime.utcnow()
    
    # MongoDBに保存
    result = await db["apps"].insert_one(app_dict)
    
    # 保存したドキュメントを取得
    created_app = await db["apps"].find_one({"_id": result.inserted_id})
    
    # ObjectIdを文字列に変換
    if created_app:
        created_app["_id"] = str(created_app["_id"])
    
    return created_app

@router.get("/apps/")
async def get_apps(skip: int = 0, limit: int = 10, db = Depends(get_db)):
    # MongoDBからアプリ一覧を取得
    cursor = db["apps"].find().skip(skip).limit(limit)
    apps = await cursor.to_list(length=limit)
    return apps

@router.get("/apps/{app_id}")
async def get_app(app_id: str, db = Depends(get_db)):
    from bson import ObjectId
    
    # 特定のアプリを取得
    app = await db["apps"].find_one({"_id": ObjectId(app_id)})
    if app is None:
        raise HTTPException(status_code=404, detail="App not found")
    return app