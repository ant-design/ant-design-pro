function getJson(infoType) {
  const json = require(`${__dirname}/${infoType}.json`);
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
