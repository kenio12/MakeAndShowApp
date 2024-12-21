from fastapi_mail import FastMail, MessageSchema, MessageType
from app.core.config import MAIL_CONFIG
from pathlib import Path

fastmail = FastMail(MAIL_CONFIG)

async def send_verification_email(email: str, username: str, token: str):
    # メールの本文を作成
    verify_url = f"http://localhost:5173/verify-email?token={token}"
    
    html = f"""
    <p>こんにちは {username} さん</p>
    <p>以下のリンクをクリックしてメールアドレスを確認してください：</p>
    <p><a href="{verify_url}">メールアドレスを確認する</a></p>
    <p>このリンクは24時間有効です。</p>
    """

    # メール設定
    message = MessageSchema(
        subject="メールアドレスの確認",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    # メール送信
    await fastmail.send_message(message) 