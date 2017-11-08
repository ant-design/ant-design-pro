---
order: 1
title: 按照高度省略
---

通过设置 `maxHeight` 属性指定最大高度，如果超过这个高度文本会自动截取。

````jsx
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';

ReactDOM.render(
  <div style={{ width: 200 }}>
    <Ellipsis maxHeight={84}>{article}</Ellipsis>
    <h4 style={{ marginTop: 24 }}>Using suffixOffset</h4>
    <Ellipsis maxHeight={84} suffixOffset={4}>{article}</Ellipsis>
  </div>
, mountNode);
````
