---
order: 0
title: 基础样例 
---

简单的倒计时组件使用。

````jsx
import CountDown from 'ant-design-pro/lib/CountDown';

const targetTime = new Date().getTime() + 3900000;

ReactDOM.render(
  <CountDown style={{ fontSize: 20 }} target={targetTime} />
, mountNode);
````
