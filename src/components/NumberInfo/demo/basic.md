---
order: 0
title: 演示
---

各种数据文案的展现方式。

````jsx
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';

ReactDOM.render(
  <div>
    <NumberInfo
      subTitle={<span>本周访问</span>}
      total={numeral(12321).format('0,0')}
      status="up"
      subTotal={17.1}
    />
    <NumberInfo
      subTitle={<span>本周访问</span>}
      total={numeral(12321).format('0,0')}
      status="up"
      subTotal={17.1}
      style={{ marginTop: 16 }}
    />
  </div>
, mountNode);
````
