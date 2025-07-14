# Use the official Node.js 18 image from Docker Hub
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","deploy"]