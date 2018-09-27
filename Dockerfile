FROM node:latest

WORKDIR /usr/src/app/

COPY package.json ./
RUN npm install --silent --no-cache

COPY ./ ./

RUN sh ./tests/fix_puppeteer.sh
RUN npm run test:all

CMD ["npm", "run", "build"]
