import React from 'react';
import BindDataStandardTable from '../BindDataStandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const orgTypes = [
  { itemCode: '1', itemValue: '生产系统' },
  { itemCode: '2', itemValue: '消费系统' },
  { itemCode: '0', itemValue: 'Both' },
];
const columnSchemas = {
  tableName: 'org',
  key: 'id',
  name: 'orgName',
  columnDetails: [
    { name: 'id', title: 'ID', add: true }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'orgCode', title: 'Code', query: true, add: true }, // 第二列需要作为查询条件，新增时需要采集
    { name: 'orgName', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    { name: 'createTime', title: 'Create Date', query: true, format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
    { name: 'appKey', title: 'App Key', query: true, add: true },
    {
      name: 'orgType',
      title: 'Org Type',
      columnHidden: false,
      query: true,
      add: true,
      tag: 'commonSelect',
      tableName: 'org',
      enumData: orgTypes,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
  ],
};
export default () => (
  <PageHeaderWrapper title="接入系统管理">
    <BindDataStandardTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
