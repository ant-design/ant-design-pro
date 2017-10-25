---
order: 1
title: 图表卡片
---

用于展示图表的卡片容器，可以方便的配合其它图表套件展示丰富信息。

````jsx
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
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
    <span>
      周同比
      <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
    </span>
    <span style={{ marginLeft: 16 }}>
      日环比
      <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
    </span>
  </ChartCard>
, mountNode);
````
