// @ts-ignore
import { Request, Response } from 'express';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default {
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === '123456' && username === 'admin') {
      res.send({
        code: 200,
        data: {
          authorization: '123',
        },
      });
      return;
    }
    if (password === '123456' && username === 'user') {
      res.send({
        code: 200,
        data: {
          authorization: '123',
        },
      });
      return;
    }

    res.send({
      code: 500,
      message: '密码或者用户名称错误',
    });
  },
};
