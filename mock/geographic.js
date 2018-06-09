function getJson(infoType) {
  const json = require(`${__dirname}/geographic/${infoType}.json`); // eslint-disable-line
  return json;
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
