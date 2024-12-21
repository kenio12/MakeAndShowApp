from datetime import datetime, timedelta, UTC
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

# パスワードハッシュ化のための設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """パスワードの検証"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """パスワードのハッシュ化"""
    return pwd_context.hash(password)

def create_access_token(data: dict) -> str:
    """JWTアクセストークンの生成"""
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def create_verification_token(email: str) -> str:
    """メール確認用トークンの生成"""
    expire = datetime.now(UTC) + timedelta(hours=24)
    data = {
        "sub": email,
        "exp": expire,
        "type": "email_verification"
    }
    return jwt.encode(data, settings.SECRET_KEY, algorithm=settings.ALGORITHM) 