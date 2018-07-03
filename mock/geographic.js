import city from './geographic/city.json';
import province from './geographic/province.json';

export function getProvince(req, res) {
  res.json(province);
}

export function getCity(req, res) {
  res.json(city[req.params.province]);
}

export default {
  getProvince,
  getCity,
};
