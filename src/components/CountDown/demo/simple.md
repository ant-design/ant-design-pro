---
order: 0
title: Simple
---

简单的页头。

````jsx
import CountDown from 'ant-design-pro/lib/CountDown';

const targetTime = new Date().getTime() + 3900000;

ReactDOM.render(
  <CountDown target={targetTime} />
, mountNode);
````
