import asyncio
from app.database import get_mongodb

async def test_connection():
    client = None
    try:
        client = await get_mongodb()
        print("MongoDB Atlas接続テスト成功！")
        
        # データベース一覧を表示してみる
        database_names = await client.list_database_names()
        print("📚 利用可能なデータベース:", database_names)
        
    except Exception as e:
        print(f"接続エラー: {e}")
    finally:
        if client:
            client.close()  # 同期的にクローズ
            print("接続をクローズしました")

if __name__ == "__main__":
    asyncio.run(test_connection())