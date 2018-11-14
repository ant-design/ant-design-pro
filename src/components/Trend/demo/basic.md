---
order: 0
title: 演示
---

在数值背后添加一个小图标来标识涨跌情况。

```jsx
import Trend from 'ant-design-pro/lib/Trend';

ReactDOM.render(
  <div>
    <Trend flag="up" >12%</Trend>
    <Trend flag="down" style={{ marginLeft: 8 }}>11%</Trend>
  </div>
, mountNode);
```
