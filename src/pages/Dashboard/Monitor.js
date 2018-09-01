import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import CountDown from '@/components/CountDown';
import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import Authorized from '@/utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="今日交易总额"
                    suffix="元"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="销售目标完成率" total="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="活动剩余时间" total={<CountDown target={targetTime} />} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="每秒交易总额"
                    suffix="元"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="等待后期实现">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
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
              <Gauge title="跳出率" height={180} percent={87} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card title="各品类占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="中式快餐"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="西餐"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="火锅"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="补贴资金剩余" percent={34} />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}
