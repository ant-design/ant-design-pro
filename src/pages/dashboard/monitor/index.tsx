import { Gauge, Liquid, Tiny, WordCloud } from '@ant-design/plots';
import { GridContent } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Card, Col, Row, Statistic } from 'antd';
import numeral from 'numeral';
import type { FC } from 'react';
import ActiveChart from './components/ActiveChart';
import Map from './components/Map';
import { queryTags } from './service';
import useStyles from './style.style';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const getAnnotations = (value: number) => [
  {
    type: 'text',
    style: {
      text: `${value * 100}%`,
      x: '50%',
      y: '50%',
      textAlign: 'center',
      fontSize: 16,
      fontStyle: 'bold',
    },
  },
];

const Monitor: FC = () => {
  const { styles } = useStyles();
  const { loading, data } = useRequest(queryTags);
  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });
  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col
            xl={18}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="今日交易总额"
                    suffix="元"
                    value={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="销售目标完成率" value="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="每秒交易总额" suffix="元" value={numeral(234).format('0,0')} />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="活动情况预测"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="券核效率"
              style={{
                marginBottom: 24,
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            >
              <Gauge
                height={180}
                data={{
                  target: 80,
                  total: 100,
                  name: 'score',
                  thresholds: [20, 40, 60, 80, 100],
                }}
                style={{
                  textContent: () => `优`,
                }}
                meta={{
                  color: {
                    range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'],
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xl={12}
            lg={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card title="各品类占比" bordered={false} className={styles.pieCard}>
              <Row
                style={{
                  padding: '16px 0',
                }}
              >
                <Col span={8}>
                  <Tiny.Ring
                    height={128}
                    percent={0.3}
                    color={['#E8EEF4', '#5FABF4']}
                    annotations={getAnnotations(0.3)}
                  />
                </Col>
                <Col span={8}>
                  <Tiny.Ring
                    height={128}
                    percent={0.22}
                    color={['#E8EEF4', '#5DDECF']}
                    annotations={getAnnotations(0.22)}
                  />
                </Col>
                <Col span={8}>
                  <Tiny.Ring
                    height={128}
                    percent={0.32}
                    color={['#E8EEF4', '#2FC25B']}
                    annotations={getAnnotations(0.32)}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col
            xl={6}
            lg={12}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{
                overflow: 'hidden',
              }}
            >
              <WordCloud
                data={wordCloudData}
                height={162}
                textField="word"
                colorField="word"
                layout={{ spiral: 'rectangular', fontSize: [10, 20] }}
              />
            </Card>
          </Col>
          <Col
            xl={6}
            lg={12}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card
              title="资源剩余"
              bodyStyle={{
                textAlign: 'center',
                fontSize: 0,
              }}
              bordered={false}
            >
              <Liquid height={160} percent={0.35} />
            </Card>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};
export default Monitor;
