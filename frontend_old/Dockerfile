FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @phosphor-icons/react

COPY next.config.js ./
COPY tsconfig.json ./

COPY . .

RUN mkdir -p .next && chown -R node:node .

USER node

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]