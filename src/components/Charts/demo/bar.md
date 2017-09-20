---
order: 4
title: 柱状图
---

````jsx
import { Bar } from 'ant-design-pro/lib/Charts';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

ReactDOM.render(
  <Bar
    height={200}
    title="销售额趋势"
    data={salesData}
  />
, mountNode);
````
