---
order: 9
title: 带有时间轴的图表
---

使用 `TimelineChart` 组件可以实现带有时间轴的柱状图展现，而其中的 `x` 属性，则是时间值的指向，默认最多支持同时展现两个指标，分别是 `y1` 和 `y2`。

````jsx
import { TimelineChart } from 'ant-design-pro/lib/Charts';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

ReactDOM.render(
  <TimelineChart
    height={200}
    data={chartData}
    titleMap={{ y1: '客流量', y2: '支付笔数' }}
  />
, mountNode);
````
