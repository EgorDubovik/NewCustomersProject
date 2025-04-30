FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -g nodemon
COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

