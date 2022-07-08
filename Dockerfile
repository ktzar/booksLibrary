FROM node:17-alpine

ENV DB_FILE=./books.db
ENV PUBLIC_PATH=public
ENV PORT=8080

WORKDIR /app
COPY server ./
COPY client/dist ./public
RUN npm install
COPY books.db ./

EXPOSE 8080
CMD node ./index
