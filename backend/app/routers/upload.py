from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import cloudinary
import cloudinary.uploader
from ..config import settings
from datetime import datetime

router = APIRouter()

# Cloudinaryの設定
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

@router.post("/api/upload/screenshots", response_model=List[str])
async def upload_screenshots(files: List[UploadFile] = File(...)):
    """
    複数の画像をアップロードするエンドポイント
    """
    uploaded_urls = []
    
    for file in files:
        # ファイル形式チェック
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="画像ファイルのみアップロード可能です")
        
        try:
            # ファイルの内容を読み込む
            contents = await file.read()
            
            # Cloudinaryにアップロード
            # ユニークなファイル名を生成
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            result = cloudinary.uploader.upload(
                contents,
                folder="makeandshowapp",  # Cloudinary上のフォルダ
                public_id=f"{timestamp}_{file.filename}"  # ファイル名
            )
            
            # セキュアなURLを取得
            uploaded_urls.append(result["secure_url"])
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"アップロード中にエラーが発生しました: {str(e)}")
    
    return uploaded_urls