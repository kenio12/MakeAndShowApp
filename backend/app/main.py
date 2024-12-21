import logging

logging.basicConfig(level=logging.DEBUG)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import auth, upload, users
from app.api import apps
import uvicorn

app = FastAPI(
    title="DevShare API",
    debug=True  # デバッグモードを有効化
)

# CORSの設定を修正
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # 両方のURLを許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # レスポンスヘッダーも公開
)

# ルーターの追加
app.include_router(auth.router, prefix="/api/auth")
app.include_router(users.router, prefix="/api/users")
app.include_router(apps.router, prefix="/api/apps")

# 静的ファイル用のディレクトリをマウント
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# アップロードルーターを追加
app.include_router(upload.router)

@app.get("/")
async def root():
    return {"message": "Welcome to DevShare API"} 

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True) 