---
order: 9
title: Timeline Chart
---

`TimelineChart` can be implemented with a histogram of the timeline. The `x` Property is the time value. The default supports up to two indicators at the same time, with `y1` and`y2`。

````jsx
import { TimelineChart } from 'ant-design-pro/lib/Charts';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

ReactDOM.render(
  <TimelineChart
    height={200}
    data={chartData}
    titleMap={{ y1: 'Passengers', y2: 'Pay' }}
  />
, mountNode);
````
