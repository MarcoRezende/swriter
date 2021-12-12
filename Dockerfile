FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8090

CMD ["npm", "run", "start:dev"] 



