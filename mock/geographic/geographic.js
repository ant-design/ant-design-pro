const fs = require('fs');

function getJson(infoType) {
  const json = fs.readFileSync(`${__dirname}/${infoType}.json`, 'utf8');
  return JSON.parse(json);
}

export function getProvince(req, res) {
  res.json(getJson('province'));
}

export function getCity(req, res) {
  res.json(getJson('city')[req.params.province]);
}

export default {
  getProvince,
  getCity,
};
