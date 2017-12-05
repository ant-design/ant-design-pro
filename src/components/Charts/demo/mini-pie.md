---
order: 6
title: 迷你饼状图
---

通过简化 `Pie` 属性的设置，可以快速的实现极简的饼状图，可配合 `ChartCard` 组合展
现更多业务场景。

```jsx
import { Pie } from 'ant-design-pro/lib/Charts';

ReactDOM.render(
  <Pie percent={28} subTitle="中式快餐" total="28%" height={140} />,
  mountNode
);
```
