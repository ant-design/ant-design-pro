import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import numeral from 'numeral';

import { NumberInfo, Pie, WaterWave, Gauge, TagCloud } from '../../components/Charts';
import CountDown from '../../components/CountDown';
import ActiveChart from '../../components/ActiveChart';

import styles from './Monitor.less';

const MapData = [];
for (let i = 0; i < 50; i += 1) {
  MapData.push({
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 400),
    value: Math.floor(Math.random() * 1000) + 500,
  });
}
const targetTime = new Date().getTime() + 3900000;

@connect(state => ({
  monitor: state.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor } = this.props;
    const { tags } = monitor;

    return (
      <div>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="今日交易总额"
                    suffix="元"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="销售目标完成率"
                    total="92%"
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="活动剩余时间"
                    total={<CountDown target={targetTime} />}
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="每秒交易总额"
                    suffix="元"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LYbCPIWLeUrdWSpVvKIL.png" alt="map" />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="券核效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                format={(val) => {
                  switch (parseInt(val, 10)) {
                    case 20:
                      return '差';
                    case 40:
                      return '中';
                    case 60:
                      return '良';
                    case 80:
                      return '优';
                    default:
                      return '';
                  }
                }}
                title="核销率"
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12} sm={24} xs={24}>
            <Card
              title="各品类占比"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <Row gutter={4} style={{ padding: '18px 0 19px 0' }}>
                <Col span={8}>
                  <Pie
                    percent={28}
                    subTitle="中式快餐"
                    total="28%"
                    height={129}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    color="#5DDECF"
                    percent={22}
                    subTitle="西餐"
                    total="22%"
                    height={129}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    color="#2FC25B"
                    percent={32}
                    subTitle="火锅"
                    total="32%"
                    height={129}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={6} sm={12} xs={24} style={{ marginBottom: 24 }}>
            <Card title="热门搜索" bordered={false}>
              <TagCloud
                data={tags}
                height={161}
              />
            </Card>
          </Col>
          <Col lg={6} sm={12} xs={24} style={{ marginBottom: 24 }}>
            <Card title="资源剩余" bodyStyle={{ textAlign: 'center' }} bordered={false}>
              <WaterWave
                height={161}
                title="补贴资金剩余"
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
