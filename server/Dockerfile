#Dockerfile
    FROM node:8
    WORKDIR /app
    COPY package.json /app
    RUN npm install
    COPY . /app
    EXPOSE 50051
    CMD node server.js