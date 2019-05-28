import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

const columnSchemas = {
  tableName: 'sys_role',
  key: 'roleId',
  name: 'roleName',
  columnDetails: [
    { name: 'roleId', title: 'Role ID', add: true, disabledAct:'true' }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'roleName', title: 'Role Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: true,
      add: false,
      tag: 'commonSelect',
      tableName: 'role',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    { name: 'remark', title: 'Remark',tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
  ],
};
export default () => (
  <PageHeaderWrapper title="分组管理" showBreadcrumb>
    <BindDataQueryTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
