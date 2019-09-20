# FROM node

# WORKDIR /app
# COPY package.json ./
# RUN npm install

# COPY ./lib ./

# CMD ["node", "server.js"]

FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]