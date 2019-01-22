FROM node:latest

WORKDIR /usr/src/app/

COPY package.json ./
RUN npm install --silent --no-cache

COPY ./ ./


CMD ["npm", "run", "start"]
