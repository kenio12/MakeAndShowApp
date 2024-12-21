from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import auth, upload
from app.api import apps
import uvicorn

app = FastAPI(
    title="DevShare API",
    debug=True  # デバッグモードを有効化
)

# CORSの設定を修正
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 開発中は全て許可
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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True) 