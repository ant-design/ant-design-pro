import type { Request, Response } from 'express';
import { defaultUser } from '../../../../mock/utils';
import { getCityOptions, provinceOptions } from '../../../utils/chinaDivision';

function getProvince(_: Request, res: Response) {
  return res.json({
    data: provinceOptions,
  });
}

function getCity(req: Request, res: Response) {
  const provinceKey = req.params.province;
  return res.json({
    data: getCityOptions(
      Array.isArray(provinceKey) ? provinceKey[0] : provinceKey,
    ),
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
