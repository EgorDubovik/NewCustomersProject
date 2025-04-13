FROM node:latest

WORKDIR /app

COPY package.json .

COPY . .
RUN npm install openai \
    && npm install express \
    && npm install --save-dev nodemon
