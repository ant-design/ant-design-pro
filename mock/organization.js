// 树形数据
import {getUrlParams} from './utils';

const data = {
  'data':[
    {
      'children':[
        {
          'code':'LSH',
          'id':'2',
          'isleaf':false,
          'name':'协约理事会',
          'orders':1,
          'parentId':'1',
          'parentName':'统合部',
          'path':'1;2',
          'pathName':'统合部/协约理事会',
          'status':'0001',
        },
        {
          'code':'CAD',
          'id':'4',
          'isleaf':true,
          'name':'商业安全委员会',
          'orders':3,
          'parentId':'1',
          'parentName':'统合部',
          'path':'1;4',
          'pathName':'统合部/商业安全委员会',
          'status':'0001',
        }
      ],
      'code':'THB',
      'id':'1',
      'isleaf':false,
      'name':'统合部',
      'orders':0,
      'parentId':'0',
      'status':'0001',
    },
    {
      'children':[
        {
          'code':'GKL',
          'id':'12',
          'isleaf':false,
          'name':'卡拉吉塔集团',
          'orders':0,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/卡拉吉塔集团',
          'status':'0001',
        },
        {
          'code':'GHZX',
          'id':'9',
          'isleaf':false,
          'name':'共和秩序局',
          'orders':1,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/共和秩序局',
          'status':'0001',
        },
        {
          'code':'SD',
          'id':'7',
          'isleaf':true,
          'name':'三岛集团',
          'orders':2,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/三岛集团',
          'status':'0001',
        },
        {
          'code':'GHQ',
          'id':'10',
          'isleaf':true,
          'name':'加达里后勤部',
          'orders':4,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/加达里后勤部',
          'status':'0001',
        },
        {
          'code':'GGT',
          'id':'11',
          'isleaf':true,
          'name':'加达里钢铁集团',
          'orders':5,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/加达里钢铁集团',
          'status':'0001',
        },
        {
          'code':'GKN',
          'id':'13',
          'isleaf':true,
          'name':'应用知识学院',
          'orders':6,
          'parentId':'6',
          'parentName':'加达里合众国',
          'path':'6,7',
          'pathName':'加达里合众国/应用知识学院',
          'status':'0001',
        },
      ],
      'code':'GDR',
      'id':'6',
      'isleaf':false,
      'name':'加达里合众国',
      'orders':1,
      'parentId':'0',
      'status':'0001',
    },
    {
      'code':'GSTS',
      'id':'14',
      'isleaf':false,
      'name':'古斯塔斯',
      'orders':2,
      'parentId':'0',
      'path':'14',
      'status':'0000',
    },
  ],
  'status':200,
  'statusText':'操作成功',
  'success':true,
};

// 获取模块数据
export function listOrg(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const dataSource = data;

  const params = getUrlParams(url);
  if (params.name) {
    dataSource.data = dataSource.data.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 删除组织
export function deleteOrg(req, res, b) {

  const body = (b && b.body) || req.body;
  const { param } = body;
  if (data.data.length > 2) {
    data.data.pop();
  }
  if (res && res.json) {
    res.json(data);
  } else {
    return data;
  }
}

// 修改状态
export function changeStatus(req, res, b) {
  const body = (b && b.body) || req.body;
  const {id, status} = body;

  const dataSource = data;
  dataSource.data = dataSource.data.map(data => {
    if (id === data.id) {
      data.status = status;
    }
    return data;
  });

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 添加模块
export function saveOrg(req, res, b) {
  const body = (b && b.body) || req.body;
  const {id, name, parentId, orders, code, remark, status} = body;
  const itemId = id ? Math.random() + 0.14 : id;
  const itemStatus = status ? '0001' : '0000';
  const item = {
    id: itemId,
    code,
    name,
    isLeaf: true,
    parentId: '',
    parentName: '根节点',
    orders,
    remark,
    status: itemStatus,
  };

  const dataSource = data;
  dataSource.data.push(item);

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  'GET /api/organization/get': {
    data: {
      code: 'THB',
      id: '1',
      isleaf: false,
      name: '统合部',
      orders: 0,
      parentId: '0',
      status: '0001',
    },
    status: 200,
    statusText: '操作成功',
    success: true,
  },
  'GET /api/organization/list': listOrg,
  'GET /api/organization/listOrgByAttr': listOrg,
  'POST /api/organization/edit': saveOrg,
  'POST /api/organization/del': deleteOrg,
  'POST /api/organization/changeStatus': changeStatus,
};
