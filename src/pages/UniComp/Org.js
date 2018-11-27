import React from 'react';
import BindDataStandardTable from '../BindDataStandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const columnSchemas = {
  tableName: 'org',
  key: 'orgId',
  name: 'name',
  columnDetails: [
    { name: 'orgId', title: 'Org ID', add: true }, // 第一列需要作为查询条件，新增时需要采集
    { name: 'orgCode', title: 'Org Code', query: true, add: true }, // 第二列需要作为查询条件，新增时需要采集
    { name: 'name', title: 'Org Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    { name: 'stateTime', title: 'Update Date', query: true, format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
    { name: 'tenantId', title: 'Tenant Id', query: true, add: true },
  ],
};
export default () => (
  <PageHeaderWrapper title="组织管理">
    <BindDataStandardTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
