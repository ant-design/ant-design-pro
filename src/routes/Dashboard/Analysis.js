import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip } from 'antd';
import numeral from 'numeral';

import { ChartCard, Trend, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, NumberInfo, IconUp, IconDown } from '../../components/Charts';

import TimelineChart from '../../components/TimelineChart';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(state => ({
  chart: state.chart,
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: [],
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  }

  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart } = this.props;
    const {
      visitData,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;

    const salesPieData = salesType === 'all' ?
      salesTypeData
      :
      (salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline);

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Icon type="camera-o" /><Icon type="export" /><Icon type="ellipsis" />
      </span>
    );

    const salesExtra = (<div className={styles.salesExtraWrap}>
      <div className={styles.salesExtra}>
        <a onClick={() => this.selectDate('today')}>今日</a>
        <a onClick={() => this.selectDate('week')}>本周</a>
        <a onClick={() => this.selectDate('month')}>本月</a>
        <a onClick={() => this.selectDate('year')}>全年</a>
      </div>
      <RangePicker
        value={rangePickerValue}
        onChange={this.handleRangePickerChange}
        style={{ width: 256 }}
      />
    </div>);

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <span style={{ textAlign: 'right' }}>{text}% {record.status === 1 ? <IconDown /> : <IconUp />}</span>
        ),
      },
    ];

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 28px' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="转化率"
            total={`${data.cvr * 100}%`}
            theme={(currentKey !== data.name) && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={(currentKey === data.name)}
            color={(currentKey !== data.name) && '#99d5fd'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 6,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="销售额"
              action={<Tooltip title="我是一段说明"><Icon type="exclamation-circle-o" /></Tooltip>}
              total={yuan(126560)}
              footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
              contentHeight={46}
            >
              <Trend colorType="gray">
                <Trend.Item title="周同比" flag="up">12.3%</Trend.Item>
                <Trend.Item title="日环比" flag="down">11%</Trend.Item>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="访问量"
              action={<Tooltip title="访问量是关键指标"><Icon type="exclamation-circle-o" /></Tooltip>}
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea
                line
                color="#AF7CE9"
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="支付笔数"
              action={<Tooltip title="支付笔数反应交易质量"><Icon type="exclamation-circle-o" /></Tooltip>}
              total={numeral(6560).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="线上购物转化率"
              action={<Tooltip title="购买效率"><Icon type="exclamation-circle-o" /></Tooltip>}
              total="78%"
              footer={<Trend>
                <Trend.Item title="周同比" flag="up">12.3%</Trend.Item>
                <Trend.Item title="日环比" flag="down">11%</Trend.Item>
              </Trend>}
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#5DD1DD" />
            </ChartCard>
          </Col>
        </Row>

        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra}>
              <TabPane tab="销售额" key="sales">
                <Row gutter={72}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <Bar
                      height={292}
                      title="销售额趋势"
                      data={salesData}
                    />
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <h4>门店销售额排名</h4>
                    <ul className={styles.rankingList}>
                      {
                        rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={(i < 3) && styles.active}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="访问量" key="visits">
                访问量没有, 因为偷懒了
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col lg={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title="线上热门搜索"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={<span>搜索用户数量 <Icon style={{ marginLeft: 8 }} type="info-circle-o" /></span>}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea
                    line
                    color="#cceafe"
                    height={45}
                    data={visitData}
                  />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="人均搜索次数"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                  />
                  <MiniArea
                    line
                    color="#5dd1dd"
                    height={45}
                    data={visitData}
                  />
                </Col>
              </Row>
              <Table
                Bordered={false}
                rowKey={record => record.index}
                size="middle"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  showSizeChanger: true,
                  showQuickJumper: true,
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title="销售额类别占比"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                <Radio.Button value="all">全部渠道</Radio.Button>
                <Radio.Button value="online">线上</Radio.Button>
                <Radio.Button value="offline">门店</Radio.Button>
              </Radio.Group>
              <div style={{ marginTop: 32, marginBottom: 67 }}>
                <Pie
                  hasLegend
                  title="销售额"
                  subTitle="销售额"
                  total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                  data={salesPieData}
                  valueFormat={val => yuan(val)}
                  height={294}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Card
          bordered={false}
          bodyStyle={{ padding: '0 0 24px 0' }}
          style={{ marginTop: 24 }}
        >
          <Tabs
            activeKey={currentTabKey || (offlineData[0] && offlineData[0].name)}
            onChange={this.handleTabChange}
          >
            {
              offlineData.map(shop => (
                <TabPane
                  tab={<CustomTab data={shop} currentTabKey={currentTabKey} />}
                  key={shop.name}
                >
                  <div style={{ padding: '0 24px' }}>
                    <TimelineChart
                      data={offlineChartData}
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    />
                  </div>
                </TabPane>)
              )
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}
