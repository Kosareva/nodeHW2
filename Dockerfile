FROM node:14
ARG PORT
RUN npm install sequelize-cli -g
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "run", "setup"]
