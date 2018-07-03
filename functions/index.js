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
  if (typeof body === 'function') {
    body(req, res);
  }
  res.send(body);
};
app.get('/api', (req, res) => {
  const html = Object.keys(mock).map(url => {
    const href = url.split(' /')[1];
    return `<li><a href="${href}"><code>${url}</code></a></li>`;
  });
  res.send(`<ul>${html.join('')}</ul>`);
});
app.get('/', (req, res) => {
  res.send(`<ul><li><a href="api/api"><code>/api</code></a></li></ul>`);
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
