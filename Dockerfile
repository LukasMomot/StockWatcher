# FROM node

# WORKDIR /app
# COPY package.json ./
# RUN npm install

# COPY ./lib ./

# CMD ["node", "server.js"]

FROM node
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm start