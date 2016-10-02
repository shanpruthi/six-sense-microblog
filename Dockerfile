FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package.json /app

COPY bower.json /app

RUN npm install -g bower

RUN npm install

RUN bower install --allow-root

COPY . /app
