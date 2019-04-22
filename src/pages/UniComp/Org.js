import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';

// const orgTypes = [
//   { itemCode: '1', itemValue: '生产系统' },
//   { itemCode: '2', itemValue: '消费系统' },
//   { itemCode: '0', itemValue: 'Both' },
// ];
const orgTypes = getItems('org', 'org_type');
const authTypes = getItems('org', 'auth_type');
const statusList = getItems('common', 'status');
console.log(orgTypes,authTypes);
const columnSchemas = {
  tableName: 'org',
  key: 'id',
  name: 'orgName',
  columnDetails: [
    { name: 'appkey', title: 'App Key', query: true},
    { name: 'id', title: 'ID',columnHidden: false, add: true, disabledAct:'true' }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'orgCode', title: 'Code'}, // 第二列需要作为查询条件，新增时需要采集
    { name: 'orgName', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    { name: 'createTime', title: 'Create Date', format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
    { name: 'tel', title: 'tel',columnHidden: true, add: true,rules:[] },
    { name: 'email', title: 'email', columnHidden: true, add: true,rules:[] },
    {
      name: 'authType',
      title: 'Auth Type',
      columnHidden: false,
      add: true,
      tag: 'commonSelect',
      tableName: 'org',
      query: true,
      enumData: authTypes,
    },
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
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: false,
      add: false,
      tag: 'commonSelect',
      tableName: 'org',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    { name: 'remark', title: 'remark', tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
  ],
};
export default () => (
  <PageHeaderWrapper title="接入系统管理">
    <BindDataQueryTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
