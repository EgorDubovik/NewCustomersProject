FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

