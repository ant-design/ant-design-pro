import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import type { DescriptionsProps } from 'antd';
import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import type { FC } from 'react';
import React from 'react';
import type { BasicGood, BasicProgress } from './data.d';
import { queryBasicProfile } from './service';

const progressColumns: ProColumns<BasicProgress>[] = [
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (text: React.ReactNode) => {
      if (text === 'success') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="processing" text="进行中" />;
    },
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
  },
];
const goodsColumns: ProColumns<BasicGood>[] = [
  {
    title: '商品编号',
    dataIndex: 'id',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
  },
  {
    title: '单价',
    dataIndex: 'price',
  },
  {
    title: '数量（件）',
    dataIndex: 'num',
    align: 'right',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    align: 'right',
  },
];

const Descriptions1: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '取货单号',
    children: '1000000000',
  },
  {
    key: '2',
    label: '状态',
    children: '已取货',
  },
  {
    key: '3',
    label: '销售单号',
    children: '1234123421',
  },
  {
    key: '4',
    label: '子订单',
    children: '3214321432',
  },
];
const Descriptions2: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '用户姓名',
    children: '付小小',
  },
  {
    key: '2',
    label: '联系电话',
    children: '18100000000',
  },
  {
    key: '3',
    label: '常用快递',
    children: '菜鸟仓储',
  },
  {
    key: '4',
    label: '取货地址',
    children: '浙江省杭州市西湖区万塘路18号',
  },
  {
    key: '5',
    label: '备注',
    children: '无',
  },
];

const Basic: FC = () => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['profile-basic'],
    queryFn: () => queryBasicProfile().then((res) => res.data),
  });
  const { basicGoods, basicProgress } = data || {
    basicGoods: [],
    basicProgress: [],
  };
  return (
    <PageContainer>
      <Card variant="borderless">
        <Descriptions title="退款申请" items={Descriptions1} />
        <Divider size="large" />
        <Descriptions title="用户信息" items={Descriptions2} />
        <Divider size="large" />
        <ProTable
          headerTitle="退货商品"
          style={{
            marginBottom: 24,
          }}
          pagination={false}
          search={false}
          loading={loading}
          options={false}
          dataSource={basicGoods}
          ghost
          columns={goodsColumns}
          rowKey="id"
          summary={(pageData) => {
            let totalNum = 0;
            let totalAmount = 0;
            pageData.forEach(({ num, amount }) => {
              totalNum += Number(num);
              totalAmount += Number(amount);
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <span style={{ fontWeight: 600 }}>总计</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">
                  <span style={{ fontWeight: 600 }}>{totalNum}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  <span style={{ fontWeight: 600 }}>{totalAmount}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <ProTable
          headerTitle="退货进度"
          pagination={false}
          loading={loading}
          search={false}
          options={false}
          ghost
          dataSource={basicProgress}
          columns={progressColumns}
        />
      </Card>
    </PageContainer>
  );
};
export default Basic;
