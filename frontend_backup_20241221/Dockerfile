FROM node:18-slim

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバー起動
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 