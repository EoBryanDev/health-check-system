# Sempre que for rodar docker build trocar a versão no package.json quando necessario
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .
COPY .env .env

RUN pnpm run build || true

EXPOSE 3000

CMD ["pnpm", "start"]
