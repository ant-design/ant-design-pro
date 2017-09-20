---
order: 1
title: 图表卡片
---

用于展示图表的卡片容器，可以方便的配合其它图表套件展示丰富信息。

````jsx
import { ChartCard, yuan, Field, Trend } from 'ant-design-pro/lib/Charts';
import { Tooltip, Icon } from 'antd';
import numeral from 'numeral';

ReactDOM.render(
  <ChartCard
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
, mountNode);
````
