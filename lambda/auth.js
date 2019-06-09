// [START functions import]
const express = require('express');
const serverLess = require('serverless-http');

const matchMock = require('./mock/matchMock');

const app = express();

app.use(matchMock);

exports.handler = serverLess(app);
