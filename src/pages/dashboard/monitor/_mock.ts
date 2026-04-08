import type { Request, Response } from 'express';
import mockjs from 'mockjs';

import mapGeoData from './map-geo.json';
import mapGridData from './map-grid.json';

const getTags = (_: Request, res: Response) => {
  return res.json({
    data: mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
  });
};

const getMapGeo = (_: Request, res: Response) => {
  return res.json(mapGeoData);
};

const getMapGrid = (_: Request, res: Response) => {
  return res.json(mapGridData);
};

export default {
  'GET  /api/tags': getTags,
  'GET  /api/monitor/map-geo': getMapGeo,
  'GET  /api/monitor/map-grid': getMapGrid,
};
