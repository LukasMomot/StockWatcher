FROM node:alpine
LABEL author="Lukas Momot"
WORKDIR /app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy and build application
COPY . .
RUN npm run build

EXPOSE 5001
CMD ["npm", "start"]