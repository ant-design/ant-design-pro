// [START functionsimport]
const NodePath = require('path');
const express = require('express');
const mock = require('./mock/index');

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', express.static(NodePath.join(__dirname, '../dist')));

app.get('/api', (req, res) => {
  const html = Object.keys(mock).map(url => {
    return `<li><code>${url}</code></li>`;
  });
  res.send(`<ul>${html.join('')}</ul>`);
});

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
app.listen(PORT);
console.log('Server startup completed');
