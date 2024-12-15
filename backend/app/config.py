from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_FROM_NAME: str = "DevShare"
    MAIL_PORT: int
    MAIL_SERVER: str
    
    class Config:
        env_file = ".env"

settings = Settings() 