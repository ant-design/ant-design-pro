---
order: 2
col: 2
title: 迷你区域图
---

```jsx
import { MiniArea } from 'ant-design-pro/lib/Charts';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

ReactDOM.render(<MiniArea line color="#cceafe" height={45} data={visitData} />, mountNode);
```
