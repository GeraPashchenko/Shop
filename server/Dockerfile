FROM node:10

WORKDIR /server

COPY ./package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["nodemon", "app.js"]