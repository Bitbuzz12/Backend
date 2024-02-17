FROM node:18.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 2001

CMD [ "npm", "start" ]
