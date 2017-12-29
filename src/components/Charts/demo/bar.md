---
order: 4
title: Histogram
---

By setting the `x`，`y` attribute, you can quickly build a beautiful histogram, the relationship between various latitudes is through custom data view.

````jsx
import { Bar } from 'ant-design-pro/lib/Charts';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1} month`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

ReactDOM.render(
  <Bar
    height={200}
    title="Sales Trends"
    data={salesData}
  />
, mountNode);
````
