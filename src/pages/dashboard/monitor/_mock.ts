import type { Request, Response } from 'express';
import mockjs from 'mockjs';

const getTags = (_: Request, res: Response) => {
  return res.json({
    data: mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
  });
};

const getMapGeo = async (_: Request, res: Response) => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
  );
  const data = await response.json();
  return res.json(data);
};

const getMapGrid = async (_: Request, res: Response) => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
  );
  const data = await response.json();
  return res.json(data);
};

export default {
  'GET  /api/tags': getTags,
  'GET  /api/monitor/map-geo': getMapGeo,
  'GET  /api/monitor/map-grid': getMapGrid,
};
