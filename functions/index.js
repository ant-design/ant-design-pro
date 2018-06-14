// [START functionsimport]
const functions = require('firebase-functions');
const express = require('express');
const mock = require('./mock/index');

const app = express();

const sendData = (body, req, res) => {
  if (!body) {
    res.send('test');
    return '';
  }
  if ('$body' in body) {
    res.send(body.$body);
    return;
  }
  if (typeof body === 'function') {
    body(req, res);
  }
  res.send(body);
};
app.get('/api', (req, res) => {
  const html = Object.keys(mock).map(url => {
    return `<li><code>${url}</code></li>`;
  });
  res.send(`<ul>${html.join('')}</ul>`);
});

Object.keys(mock).forEach(url => {
  const body = mock[url];
  const urlParams = url.split(' ');

  const path = urlParams[1];
  const send = (req, res) => {
    sendData(body, req, res);
  };
  if (urlParams[0] === 'GET') {
    app.get(path, send);
  }
  if (urlParams[0] === 'POST') {
    app.post(path, send);
  }
});

exports.api = functions.https.onRequest(app);
