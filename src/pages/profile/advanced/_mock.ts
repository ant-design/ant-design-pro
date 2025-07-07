import type { Request, Response } from 'express';

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

function getProfileAdvancedData(_req: Request, res: Response) {
  const result = {
    data: {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    },
  };
  return res.json(result);
}

export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
