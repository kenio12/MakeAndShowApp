from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.auth.utils import verify_password, get_password_hash, create_access_token
from app.utils.email import send_verification_email

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # メールアドレスの重複チェック
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # ユーザー名の重複チェック
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # パスワードのハッシュ化
    hashed_password = get_password_hash(user.password)
    
    # 新規ユーザーの作成
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
        is_active=False  # メール認証前はFalse
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # 確認メールの送信
    token = create_email_verification_token(user.email)
    send_verification_email(user.email, token)
    
    return db_user

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # ユーザーの検索
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # JWTトークンの生成
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"} 

@router.post("/verify-email/{token}")
async def verify_email(token: str, db: Session = Depends(get_db)):
    user = verify_email_token(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    user.is_active = True
    db.commit()
    return {"message": "Email verified successfully"}

@router.post("/forgot-password")
async def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if user:
        # パスワードリ��ットメールを送信
        send_password_reset_email(user.email)
    return {"message": "If an account exists, a password reset link has been sent"}