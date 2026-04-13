import type { Request, Response } from 'express';
import { fakeList, defaultUser, titles, avatars, covers, desc, user } from '../../../../mock/utils';

function getProjectNotice(): any[] {
  return titles.slice(0, 6).map((title, i) => ({
    id: `xxx${i + 1}`,
    title,
    logo: avatars[i],
    description: desc[i % 5],
    updatedAt: i % 2 === 0 ? new Date() : new Date('2017-07-24'),
    member: ['科学搬砖组', '全组都是吴彦祖', '中二少女团', '程序员日常', '高逼格设计天团', '骗你来学计算机'][i],
    href: '',
    memberLink: '',
  }));
}

function fakeListForCenter(count: number) {
  const list = fakeList(count);
  // 添加 percent 和其他必需字段
  return list.map((item: any, i: number) => ({
    ...item,
    percent: Math.ceil(Math.random() * 50) + 50,
  }));
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