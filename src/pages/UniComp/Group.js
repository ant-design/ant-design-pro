import React from 'react';
import BindDataStandardTable from '../BindDataStandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

const columnSchemas = {
  tableName: 'groups',
  key: 'groupId',
  name: 'name',
  columnDetails: [
    { name: 'groupId', title: 'Group ID', add: true, disabledAct:'true' }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'name', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: false,
      add: false,
      tag: 'commonSelect',
      tableName: 'group',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
  ],
};
export default () => (
  <PageHeaderWrapper title="分组系统管理">
    <BindDataStandardTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
