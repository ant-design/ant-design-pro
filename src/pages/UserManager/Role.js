import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

const columnSchemas = {
  tableName: 'sys_role',
  key: 'roleId',
  name: 'roleName',
  columnDetails: [
    { name: 'roleId', title: formatMessage({'id':'app.role.sys_role.roleId'}), add: true, disabledAct:'true' }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'roleName', title: formatMessage({'id':'app.role.sys_role.roleName'}), sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    {
      name: 'status',
      title: formatMessage({'id':'app.role.sys_role.status'}),
      columnHidden: false,
      query: true,
      add: false,
      tag: 'commonSelect',
      tableName: 'role',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    { name: 'remark', title: formatMessage({'id':'app.role.sys_role.remark'}),tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
  ],
};
export default () => (
  <PageHeaderWrapper>
    <BindDataQueryTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
