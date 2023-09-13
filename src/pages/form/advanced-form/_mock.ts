import type { Request, Response } from 'express';

export default {
  'POST  /api/advancedForm': (_: Request, res: Response) => {
    res.send({ data: { message: 'Ok' } });
  },
};
