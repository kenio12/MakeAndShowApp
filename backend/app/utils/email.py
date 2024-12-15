import emails
from app.config import settings

def send_email(
    email_to: str,
    subject: str,
    html_content: str
) -> bool:
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.MAIL_FROM_NAME, settings.MAIL_FROM)
    )
    
    response = message.send(
        to=email_to,
        smtp={
            "host": settings.MAIL_SERVER,
            "port": settings.MAIL_PORT,
            "user": settings.MAIL_USERNAME,
            "password": settings.MAIL_PASSWORD,
            "tls": True,
        }
    )
    
    return response.status_code == 250

def send_verification_email(email_to: str, token: str) -> bool:
    subject = "メールアドレスの確認"
    verification_url = f"http://localhost:3000/verify-email?token={token}"
    
    html_content = f"""
    <p>DevShareへようこそ！</p>
    <p>以下のリンクをクリックして、メールアドレスを確認してください：</p>
    <p><a href="{verification_url}">メールアドレスを確認する</a></p>
    <p>このリンクは30分間有効です。</p>
    """
    
    return send_email(email_to, subject, html_content) 