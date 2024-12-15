from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from app.config import settings
from sqlalchemy.orm import Session
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")

def create_email_verification_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=30)
    return jwt.encode(
        {"email": email, "exp": expire},
        settings.JWT_SECRET,
        algorithm="HS256"
    )

def verify_email_token(token: str, db: Session) -> User | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        email = payload.get("email")
        if email is None:
            return None
        user = db.query(User).filter(User.email == email).first()
        return user
    except jwt.JWTError:
        return None 