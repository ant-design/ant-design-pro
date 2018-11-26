---
order: 0
title: 颜色反转
---

在数值背后添加一个小图标来标识涨跌情况。

```jsx
import Trend from 'ant-design-pro/lib/Trend';

ReactDOM.render(
  <div>
    <Trend flag="up" reverseColor={true} >12%</Trend>
    <Trend flag="down" reverseColor={true} style={{ marginLeft: 8 }}>11%</Trend>
  </div>
, mountNode);
```
