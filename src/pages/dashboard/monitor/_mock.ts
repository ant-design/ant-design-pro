import type { Request, Response } from 'express';
import mockjs from 'mockjs';

const getTags = (_: Request, res: Response) => {
  return res.json({
    data: mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
  });
};

export default {
  'GET  /api/tags': getTags,
};
