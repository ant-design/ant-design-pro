---
order: 0
title: Structure
---

结构包含 `处理结果`，`补充信息` 以及 `操作建议` 三个部分，其中 `处理结果` 由
`提示图标`，`标题` 和 `结果描述` 组成。

```jsx
<<<<<<< HEAD
import Result from 'ant-design-pro/lib/Result';
=======
import Result from "ant-design-pro/lib/Result";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

ReactDOM.render(
  <Result
    type="success"
<<<<<<< HEAD
    title={<div style={{ background: '#7dbcea', color: '#fff' }}>标题</div>}
    description={
      <div style={{ background: 'rgba(16, 142, 233, 1)', color: '#fff' }}>
=======
    title={<div style={{ background: "#7dbcea", color: "#fff" }}>标题</div>}
    description={
      <div style={{ background: "rgba(16, 142, 233, 1)", color: "#fff" }}>
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
        结果描述
      </div>
    }
    extra="其他补充信息，自带灰底效果"
    actions={
<<<<<<< HEAD
      <div style={{ background: '#3ba0e9', color: '#fff' }}>
=======
      <div style={{ background: "#3ba0e9", color: "#fff" }}>
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
        操作建议，一般放置按钮组
      </div>
    }
  />,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```
