// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Table } from 'antd';

const columns = [
  {
    title: 'userId',
    dataIndex: 'userId',
  },
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'title',
    dataIndex: 'title',
  },
];
const data = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
  },
  {
    userId: 1,
    id: 6,
    title: 'natus impedit quibusdam illo est',
  },
  {
    userId: 1,
    id: 7,
    title: 'quibusdam autem aliquid et et quia',
  },
  {
    userId: 1,
    id: 8,
    title: 'qui fuga est a eum',
  },
];
export default () => (
  <PageHeaderWrapper>
    <div>This is Test Page</div>

    <Table dataSource={data} columns={columns} />
  </PageHeaderWrapper>
);
