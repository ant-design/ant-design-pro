---
title: 
  en-US: TagSelect
  zh-CN: TagSelect
subtitle: 标签选择器
cols: 1
order: 13
---

可进行多选，带折叠收起和展开更多功能，常用于对列表进行筛选。

## API

### TagSelect

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| value    |选中的项              |string[] \| number[] | |
| defaultValue    |默认选中的项   |string[] \| number[] | |
| onChange | 标签选择的回调函数 | Function(checkedTags) |  |
| expandable | 是否展示 `展开/收起` 按钮 | Boolean | false |
| hideCheckAll | 隐藏 `全部` 按钮 | Boolean | false |

### TagSelectOption

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| value | TagSelect的值  | string\| number | - |
| children | tag的内容 | string \| ReactNode | - |
