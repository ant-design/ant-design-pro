// [START functionsimport]
const functions = require('firebase-functions');
const express = require('express');
const matchMock = require('./matchMock');
const app = express();

app.use(matchMock);

exports.api = functions.https.onRequest(app);
