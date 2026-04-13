import type { Request, Response } from 'express';
import { fakeList, defaultUser, titles, avatars, desc } from '../../../../mock/utils';

function getProjectNotice() {
  return titles.slice(0, 6).map((title, i) => ({
    id: `xxx${i + 1}`,
    title,
    logo: avatars[i],
    description: desc[i % desc.length],
    updatedAt: i % 2 === 0 ? new Date() : new Date('2017-07-24'),
    member: ['科学搬砖组', '全组都是吴彦祖', '中二少女团', '程序员日常', '高逼格设计天团', '骗你来学计算机'][i],
    href: '',
    memberLink: '',
  }));
}

function fakeListForCenter(count: number) {
  return fakeList(count);
}

function getFakeList(req: Request, res: Response) {
  const params = req.query as any;

  const count = Number(params.count) * 1 || 5;

  const result = fakeListForCenter(count);
  return res.json({
    data: {
      list: result,
    },
  });
}

function getCurrentUser(_req: Request, res: Response) {
  return res.json({
    data: {
      ...defaultUser,
      notice: getProjectNotice(),
    },
  });
}

export default {
  'GET  /api/fake_list_Detail': getFakeList,
  'GET  /api/currentUserDetail': getCurrentUser,
};