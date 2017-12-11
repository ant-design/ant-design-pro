---
order: 0
title: 演示
---

各种数据文案的展现方式。

```jsx
<<<<<<< HEAD
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
=======
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import numeral from "numeral";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

ReactDOM.render(
  <div>
    <NumberInfo
      subTitle={<span>本周访问</span>}
      total={numeral(12321).format("0,0")}
      status="up"
      subTotal={17.1}
    />
  </div>,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```
