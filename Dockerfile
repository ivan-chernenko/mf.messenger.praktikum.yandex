FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm ci && npm run build

EXPOSE 80

CMD npm run start
