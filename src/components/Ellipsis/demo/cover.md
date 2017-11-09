---
order: 2
title: 按照行数省略的覆盖后缀模式
---

通过设置 `lines` 属性指定最大行数，如果超过这个行数的文本会自动截取。通过设置 `cover` 属性设置后缀的覆盖模式，在这种模式下可以在 `children` 中使用 `ReactNode`。

但是因为是覆盖形式的后缀，可能需要通过 `suffixOffset` 以及 `suffixColor` 来设置 `...` 的样式以修正。

````jsx
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const article = <p>There were injuries alleged in three <a href="#cover">cases in 2015</a>, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.</p>;

ReactDOM.render(
  <div style={{ width: 200 }}>
    <Ellipsis lines={3} cover>{article}</Ellipsis>
    <h4 style={{ marginTop: 24 }}>Using SuffixOffset</h4>
    <Ellipsis lines={3} cover suffixOffset={4}>{article}</Ellipsis>
  </div>
, mountNode);
````
