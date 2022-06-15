FROM node:alpine

WORKDIR /Users/app

COPY package.json ./

RUN  npm install

COPY . .

EXPOSE 3333

CMD ["npm","rum","dev"]
