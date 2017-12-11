---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的倒计时组件使用。

## en-US

The simplest usage.

```jsx
<<<<<<< HEAD
import CountDown from 'ant-design-pro/lib/CountDown';
=======
import CountDown from "ant-design-pro/lib/CountDown";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

const targetTime = new Date().getTime() + 3900000;

ReactDOM.render(
  <CountDown style={{ fontSize: 20 }} target={targetTime} />,
  mountNode
);
```
