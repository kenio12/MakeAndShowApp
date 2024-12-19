from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import auth, upload
from app.api import apps

app = FastAPI(title="DevShare API")

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの追加
app.include_router(auth.router)
app.include_router(apps.router, prefix="/api")

# 静的ファイル用のディレクトリをマウント
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# アップロードルーターを追加
app.include_router(upload.router)

@app.get("/")
async def root():
    return {"message": "Welcome to DevShare API"} 