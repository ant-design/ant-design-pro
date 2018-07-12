import city from './geographic/city.json';
import province from './geographic/province.json';

function getProvince(req, res) {
  res.json(province);
}

function getCity(req, res) {
  res.json(city[req.params.province]);
}

export default {
  'GET /api/geographic/province': getProvince,
  'GET /api/geographic/city/:province': getCity,
};
