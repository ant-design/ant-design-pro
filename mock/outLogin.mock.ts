// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    res.status(200).send({
      code: 200,
    });
  },
};
