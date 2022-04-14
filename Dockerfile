FROM node:17-alpine3.14

ADD server /app
RUN npm i -g yarn
RUN cd server;
RUN yarn

