from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
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

@app.get("/")
async def root():
    return {"message": "Welcome to DevShare API"} 