import React from 'react';
import BindDataStandardTable from '../BindDataStandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const columnSchemas = {
  tableName: 'groups',
  key: 'id',
  name: 'name',
  columnDetails: [
    { name: 'id', title: 'ID', add: true }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'name', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
  ],
};
export default () => (
  <PageHeaderWrapper title="分组系统管理">
    <BindDataStandardTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
