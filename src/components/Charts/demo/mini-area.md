---
order: 2
col: 2
title: 迷你区域图
---

```jsx
<<<<<<< HEAD
import { MiniArea } from 'ant-design-pro/lib/Charts';
import moment from 'moment';
=======
import { MiniArea } from "ant-design-pro/lib/Charts";
import moment from "moment";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
<<<<<<< HEAD
      'YYYY-MM-DD',
    ),
    y: Math.floor(Math.random() * 100) + 10,
=======
      "YYYY-MM-DD"
    ),
    y: Math.floor(Math.random() * 100) + 10
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
  });
}

ReactDOM.render(
  <MiniArea line color="#cceafe" height={45} data={visitData} />,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```
