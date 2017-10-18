---
order: 0
title: Simple
---

简单的页头。

````jsx
import TagSelect from 'ant-design-pro/lib/TagSelect';

const TagOption = TagSelect.Option;
const TagExpand = TagSelect.Expand;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

ReactDOM.render(
  <TagSelect onChange={handleFormSubmit}>
    <TagOption value="cat1">类目一</TagOption>
    <TagOption value="cat2">类目二</TagOption>
    <TagOption value="cat3">类目三</TagOption>
    <TagOption value="cat4">类目四</TagOption>
    <TagExpand>
      <TagOption value="cat5">类目五</TagOption>
      <TagOption value="cat6">类目六</TagOption>
    </TagExpand>
  </TagSelect>
, mountNode);
````
