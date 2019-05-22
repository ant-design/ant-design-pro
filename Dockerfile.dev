FROM node:latest

WORKDIR /usr/src/app/

COPY package.json ./
RUN npm install --silent --no-cache --registry=https://registry.npm.taobao.org

COPY ./ ./


CMD ["npm", "run", "start"]
