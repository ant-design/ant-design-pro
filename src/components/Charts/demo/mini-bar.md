---
order: 2
col: 2
title: 迷你柱状图
---

迷你柱状图更适合展示简单的区间数据，简洁的表现方式可以很好的减少大数据量的视觉展现压力。

```jsx
import { MiniBar } from 'ant-design-pro/lib/Charts';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

ReactDOM.render(<MiniBar height={45} data={visitData} />, mountNode);
```
