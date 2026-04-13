import type { Request, Response } from 'express';
import { defaultUser } from '../../../../mock/utils';

const city = require('./geographic/city.json');
const province = require('./geographic/province.json');

function getProvince(_: Request, res: Response) {
  return res.json({
    data: province,
  });
}

function getCity(req: Request, res: Response) {
  const provinceKey = req.params.province;
  return res.json({
    data: city[provinceKey as keyof typeof city],
  });
}

function getCurrentUse(_req: Request, res: Response) {
  return res.json({
    data: defaultUser,
  });
}

export default {
  'GET  /api/accountSettingCurrentUser': getCurrentUse,
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};