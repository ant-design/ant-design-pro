// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 85,
      disabled: false,
      href: 'https://ant.design',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      name: '于明',
      owner: 'Brown',
      desc: '还传府发和角心程温界开口无。',
      callNo: 90,
      status: 67,
      updatedAt: '(i)',
      createdAt: 'V[5',
      progress: 89,
    });
  },
};
