from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str
    REDIS_URL: str  # これ追加
    JWT_SECRET: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_FROM_NAME: str = "DevShare"
    MAIL_PORT: int
    MAIL_SERVER: str
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True  # 大文字小文字を区別する

settings = Settings() 