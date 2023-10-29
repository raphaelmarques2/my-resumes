FROM node:18

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build

CMD npm start

