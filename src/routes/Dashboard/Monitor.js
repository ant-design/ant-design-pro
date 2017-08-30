import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import numeral from 'numeral';

import { NumberInfo, MiniArea, Pie, WaterWave, Gauge } from '../../components/Charts';
import MapChart from '../../components/MapChart';
import TagCloud from '../../components/TagCloud';
import Countdown from '../../components/Countdown';
import { fixedZero } from '../../utils/utils';

import styles from './Monitor.less';

const activeData = [];
for (let i = 0; i < 24; i += 1) {
  activeData.push({
    x: `${fixedZero(i)}:00`,
    y: (i * 50) + (Math.floor(Math.random() * 200)),
  });
}

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
          <Col lg={16} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="今日交易总额"
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
                    total={<Countdown target={targetTime} />}
                  />
                </Col>
                <Col sm={6} xs={12}>
                  <NumberInfo
                    subTitle="每秒交易总额"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <MapChart
                  data={MapData}
                />
              </div>
            </Card>
          </Col>
          <Col lg={8} md={24} sm={24} xs={24}>
            <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <div className={styles.activeChart}>
                <NumberInfo
                  subTitle="目标评估"
                  total="有望达到预期"
                />
                <div style={{ marginTop: 32 }}>
                  <MiniArea
                    line
                    color="#5DD1DD"
                    height={84}
                    yAxis={{
                      tickCount: 3,
                      tickLine: false,
                      labels: false,
                      title: false,
                      line: false,
                    }}
                    data={activeData}
                  />
                </div>
                {
                  activeData && (
                    <div className={styles.activeChartGrid}>
                      <p>{[...activeData].sort()[activeData.length - 1].y + 200} 亿元</p>
                      <p>{[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元</p>
                    </div>
                  )
                }
                {
                  activeData && (
                    <div className={styles.activeChartLegend}>
                      <span>00:00</span>
                      <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
                      <span>{activeData[activeData.length - 1].x}</span>
                    </div>
                  )
                }
              </div>
            </Card>
            <Card
              title="券核效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title="跳出率"
                height={164}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sm={8} xs={24}>
            <Card
              title="各品类占比"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <Row style={{ padding: '18px 0 19px 0' }}>
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
                    color="#5DD1DD"
                    percent={22}
                    subTitle="西餐"
                    total="22%"
                    height={129}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    color="#B5EDC9"
                    percent={32}
                    subTitle="火锅"
                    total="32%"
                    height={129}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={8} xs={24} style={{ marginBottom: 24 }}>
            <Card title="热门搜索" bordered={false}>
              <TagCloud
                data={tags}
                height={161}
              />
            </Card>
          </Col>
          <Col sm={8} xs={24} style={{ marginBottom: 24 }}>
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
