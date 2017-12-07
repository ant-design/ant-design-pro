---
order: 0
title: 基础样例
---

结合 `Tag` 的 `TagSelect` 组件，方便的应用于筛选类目的业务场景中。

```jsx
<<<<<<< HEAD
import TagSelect from 'ant-design-pro/lib/TagSelect';
=======
import TagSelect from "ant-design-pro/lib/TagSelect";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

ReactDOM.render(
  <TagSelect onChange={handleFormSubmit}>
    <TagSelect.Option value="cat1">类目一</TagSelect.Option>
    <TagSelect.Option value="cat2">类目二</TagSelect.Option>
    <TagSelect.Option value="cat3">类目三</TagSelect.Option>
    <TagSelect.Option value="cat4">类目四</TagSelect.Option>
    <TagSelect.Option value="cat5">类目五</TagSelect.Option>
    <TagSelect.Option value="cat6">类目六</TagSelect.Option>
  </TagSelect>,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```
