import React from 'react';
import BindDataStandardTable from '../BindDataStandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const columnSchemas = {
  tableName: 'component',
  key: 'componentId',
  name: 'name',
  columnDetails: [
    { name: 'componentId', title: 'Component Id', query: true, add: true }, // 需要作为查询条件，新增时需要采集
    { name: 'code', title: 'Code', query: true, add: true }, // 需要作为查询条件，新增时需要采集
    { name: 'name', title: 'Name', sorter: true, query: true, add: true }, // 需要排序，需要作为查询条件，新增时需要采集
    {
      name: 'orgId',
      title: 'Org Id',
      columnHidden: false,
      query: true,
      add: true,
      tag: 'select',
      tableName: 'org',
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    { name: 'stateTime', title: 'State Time', query: true, format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
  ],
};

export default () => (
  <PageHeaderWrapper>
    <BindDataStandardTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
