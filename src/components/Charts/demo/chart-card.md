---
order: 1
title: Chart Card
---

Card containers for presentational charts.  Easy integration with other chart kits that deliver rich information.

````jsx
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';

ReactDOM.render(
  <Row>
    <Col span={24}>
      <ChartCard
        title="Sales"
        action={<Tooltip title="Indicator Description"><Icon type="info-circle-o" /></Tooltip>}
        total={yuan(126560)}
        footer={<Field label="Daily Average Sales" value={numeral(12423).format('0,0')} />}
        contentHeight={46}
      >
        <span>
          Weekly Comparison
          <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
        </span>
        <span style={{ marginLeft: 16 }}>
          Daily Comparison
          <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
        </span>
      </ChartCard>
    </Col>
    <Col span={24} style={{ marginTop: 24 }}>
      <ChartCard
        title="Movement Indicator"
        avatar={
          <img
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
            alt="indicator"
          />
        }
        action={<Tooltip title="Indicator Description"><Icon type="info-circle-o" /></Tooltip>}
        total={yuan(126560)}
        footer={<Field label="Daily Average Sales" value={numeral(12423).format('0,0')} />}
      />
    </Col>
    <Col span={24} style={{ marginTop: 24 }}>
      <ChartCard
        title="Movement Indicator"
        avatar={(
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        )}
        action={<Tooltip title="Indicator Description"><Icon type="info-circle-o" /></Tooltip>}
        total={yuan(126560)}
      />
    </Col>
  </Row>
, mountNode);
````
