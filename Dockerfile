FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY ./lib ./

CMD ["node", "server.js"]