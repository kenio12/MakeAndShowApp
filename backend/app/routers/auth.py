from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.utils.auth import verify_password, get_password_hash, create_access_token, create_verification_token
from app.utils.email import send_verification_email
from jose import jwt
from jose import JWTError
from app.config import settings
from datetime import datetime

router = APIRouter(tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        print("===== Registration Debug =====")
        print(f"MongoDB URI: {settings.MONGODB_URI}")  # 接続先URL
        print(f"Database instance: {db}")  # データベースインスタンス
        print(f"Database name: {db.name}")  # データベース名
        print(f"Collections: {await db.list_collection_names()}")  # コレクション一覧
        existing_user = await db.users.find_one({"email": user.email})
        print(f"Existing user check: {existing_user}")  # 既存ユーザーの検索結果
        print("============================")
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # ユーザー名の重複チェック
        if await db.users.find_one({"username": user.username}):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        
        # 確認トークンを生成
        verification_token = create_verification_token(user.email)
        
        # 新規ユーザーの作成
        user_dict = {
            "email": user.email,
            "username": user.username,
            "hashed_password": get_password_hash(user.password),
            "is_active": False,
            "is_verified": False,
            "verification_token": verification_token,
            "created_at": datetime.utcnow()
        }
        
        result = await db.users.insert_one(user_dict)
        
        # 作成したユーザーを取得
        created_user = await db.users.find_one({"_id": result.inserted_id})
        
        # MongoDBの_idをstrに変換
        created_user["_id"] = str(created_user["_id"])
        
        # 確認メールの送信
        await send_verification_email(user.email, user.username, verification_token)
        
        return created_user  # MongoDBから取得したデータをそのまま返す
    except Exception as e:
        print(f"Registration error: {str(e)}")  # デバッグ用
        raise

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    # ユーザーの検索
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # JWTトークンの生成
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"} 

@router.post("/verify-email/{token}")
async def verify_email(token: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    # トークンの検証
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    # ユーザーの更新
    result = await db.users.update_one(
        {"email": email},
        {"$set": {"is_active": True, "is_verified": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    return {"message": "Email verified successfully"}

@router.post("/forgot-password")
async def forgot_password(email: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    # ユーザーの検索
    user = await db.users.find_one({"email": email})
    if user:
        # パスワードリセットメールを送信
        await send_password_reset_email(user["email"])
    return {"message": "If an account exists, a password reset link has been sent"}