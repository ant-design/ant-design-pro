// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      code: 200,
      data: {
        name: '李敏',
        avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
        userid: '52EbC20E-20fd-74CE-337B-a5F69deeE871',
        email: 's.cbbvov@ccl.lu',
        signature: '型几据院但要指交管象引到此。',
        title: '员对流面效原会从成些单声场次气。',
        group: '服务技术部',
        tags: [
          { key: 1, label: '名望程序员' },
          { key: 2, label: '阳光少年' },
          { key: 3, label: '名望程序员' },
          { key: 4, label: '程序员' },
          { key: 5, label: '专注设计' },
          { key: 6, label: '海纳百川' },
          { key: 7, label: '专注设计' },
          { key: 8, label: '名望程序员' },
          { key: 9, label: '程序员' },
        ],
        notifyCount: 78,
        unreadCount: 86,
        country: '墨西哥',
        access: '太间究调难积车龙好全小京导类采低识。',
        geographic: { province: { label: '湖南省', key: 10 }, city: { label: '洛阳市', key: 11 } },
        address: '江苏省 徐州市 睢宁县',
        phone: '11255057362',
      },
    });
  },
};
