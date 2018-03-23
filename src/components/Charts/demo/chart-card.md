---
order: 1
title: 图表卡片
---

用于展示图表的卡片容器，可以方便的配合其它图表套件展示丰富信息。

```jsx
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';

ReactDOM.render(
  <Row>
    <Col span={24}>
      <ChartCard
        title="销售额"
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => (
          <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />
        )}
        footer={
          <Field label="日均销售额" value={numeral(12423).format("0,0")} />
        }
        contentHeight={46}
      >
        <span>
          周同比
          <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
            12%
          </Trend>
        </span>
        <span style={{ marginLeft: 16 }}>
          日环比
          <Trend
            flag="down"
            style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
          >
            11%
          </Trend>
        </span>
      </ChartCard>
    </Col>
    <Col span={24} style={{ marginTop: 24 }}>
      <ChartCard
        title="移动指标"
        avatar={
          <img
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
            alt="indicator"
          />
        }
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => (
          <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />
        )}
        footer={
          <Field label="日均销售额" value={numeral(12423).format("0,0")} />
        }
      />
    </Col>
    <Col span={24} style={{ marginTop: 24 }}>
      <ChartCard
        title="移动指标"
        avatar={
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        }
        action={
          <Tooltip title="指标说明">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => (
          <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />
        )}
      />
    </Col>
  </Row>,
  mountNode,
);
```
