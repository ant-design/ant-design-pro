import React from 'react';
import { Row, Col, Table, Tooltip, Card, Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Charts from './Charts';
import Trend from './Trend';
import NumberInfo from './NumberInfo';
import numeral from 'numeral';
import styles from '../style.less';
import { ISearchData, IVisitData2 } from '../data';

const { MiniArea } = Charts;

const columns = [
  {
    title: <FormattedMessage id="analysis.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: <FormattedMessage id="analysis.table.search-keyword" defaultMessage="Search keyword" />,
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="analysis.table.users" defaultMessage="Users" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="analysis.table.weekly-range" defaultMessage="Weekly Range" />,
    dataIndex: 'range',
    key: 'range',
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    render: (text: React.ReactNode, record: { status: number }) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
  },
];

const TopSearch = ({
  loading,
  visitData2,
  searchData,
  dropdownGroup,
}: {
  loading: boolean;
  visitData2: IVisitData2[];
  dropdownGroup: React.ReactNode;
  searchData: ISearchData[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage
        id="analysis.analysis.online-top-search"
        defaultMessage="Online Top Search"
      />
    }
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage id="analysis.analysis.search-users" defaultMessage="search users" />
              <Tooltip
                title={
                  <FormattedMessage id="analysis.analysis.introduce" defaultMessage="introduce" />
                }
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="analysis.analysis.per-capita-search"
                defaultMessage="Per Capita Search"
              />
              <Tooltip
                title={
                  <FormattedMessage id="analysis.analysis.introduce" defaultMessage="introduce" />
                }
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row>
    <Table<any>
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
