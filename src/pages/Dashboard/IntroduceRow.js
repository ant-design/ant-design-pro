import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from './Analysis.less';
import { ChartCard, MiniArea, Field } from '@/components/Charts';
import Trend from '@/components/Trend';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='Total Call Count'
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(192423).format('0,0')}`}
        footer={
          <Field
            label="Daily Call"
            value={`${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          WoW Change
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          DoD Change
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="The calls in the past days"
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={
          <Field
            label="Daily average calls"
            value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
