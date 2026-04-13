import type { Request, Response } from 'express';
import { fakeList } from '../../../../mock/utils';

let sourceData: any[] = [];

function getFakeList(req: Request, res: Response) {
  const params = req.query as any;

  const count = Number(params.count) * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json({
    data: {
      list: result,
    },
  });
}

function postFakeList(req: Request, res: Response) {
  const { body } = req;
  const { method, id } = body;
  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter((item) => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: Date.now(),
      });
      break;
    default:
      break;
  }

  return res.json({
    data: {
      list: result,
    },
  });
}

export default {
  'GET  /api/get_list': getFakeList,
  'POST  /api/post_fake_list': postFakeList,
};