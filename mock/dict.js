import {getUrlParams} from './utils';
// 树形数据
const data = [{
  id: 1,
  name: '业务代码',
  code: 'busin_',
  parent: 0,
  children: [{
    id: 11,
    parent: 1,
    name: 'base_system',
    code: 'base_system',
    desc: '系统类型',
  }, {
    id: 12,
    parent: 1,
    name: 'base_operate',
    code: 'base_operate',
    desc: '操作类型',
  }],
}, {
  id: 2,
  name: '系统代码',
  code: 'sys_c',
  parent: 0,
  children: [{
    id: 21,
    parent: 2,
    name: 'base_system',
    code: 'base_system',
    desc: '系统类型',
  }, {
    id: 22,
    parent: 2,
    name: 'base_operate',
    code: 'base_operate',
    desc: '操作类型',
  }],
}];

const itemData = [{
  id: 111,
  code: 'base_demo',
  keyName: '0001',
  keyValue: '交旧商品库_示例',
  desc: '这是描述',
  enable: true,
  order: 1,
  parent: 1,
  parentName: '业务代码',
}, {
  id: 112,
  code: 'base_demo',
  keyName: '0002',
  keyValue: '销售商品库_示例',
  desc: '这是描述',
  enable: false,
  order: 2,
  parent: 1,
  parentName: '业务代码',
}];

// 获取字典列表数据
export function listDict(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let dataSource = [...data];
  // 查询
  if (params.filter) {
    dataSource = dataSource.filter(item => item.name.indexOf(params.filter) > -1
      || item.code.indexOf(params.filter) > -1);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 获取字典项数据
export function getDict(req, res, u) {
  const returnData = {
    currentItem: {code: 'base_demo'},
    dictData: itemData,
  };
  if (res && res.json) {
    res.json(returnData);
  } else {
    return returnData;
  }
}

// 删除字典项数据
export function deleteDictItem(req, res, b) {
  const body = (b && b.body) || req.body;
  const {id} = body;

  let dataSource = [...itemData];
  if (id) {
    dataSource = dataSource.filter(item => id !== item.id);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 添加字典项数据
export function addDictItem(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const newRecord = {...body};

  let dataSource = [...itemData];

  if (newRecord.id) {
    // 编辑
    dataSource = dataSource.map((item) => {
      if (item.id === newRecord.id) {
        item = newRecord;
      }
      return item;
    });
  } else {
    // 新增
    dataSource.push(newRecord);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  'GET /api/dict/getDict': getDict,
  'GET /api/dict/list': listDict,
  'POST /api/dict/deleteDictItem': deleteDictItem,
  'POST /api/dict/addDictItem': addDictItem,
};
