---
order: 2
col: 2
title: Mini Bar Chart
---

The mini-histogram is suitable for displaying interval data, simplicity can be a good way to reduce the visual pressure of large data volume.

````jsx
import { MiniBar } from 'ant-design-pro/lib/Charts';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

ReactDOM.render(
  <MiniBar
    height={45}
    data={visitData}
  />
, mountNode);
````
