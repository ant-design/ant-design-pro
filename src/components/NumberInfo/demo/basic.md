---
order: 0
title:
  zh-CN: 演示
  en-US: Demo
---

## zh-CN

各种数据文案的展现方式。

## en-US

Used for presenting various numerical data.

```jsx
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';

ReactDOM.render(
  <div>
    <NumberInfo
      subTitle={<span>Visits this week</span>}
      total={numeral(12321).format('0,0')}
      status="up"
      subTotal={17.1}
    />
  </div>,
  mountNode
);
```
