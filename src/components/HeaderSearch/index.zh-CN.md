---
title:
  en-US: HeaderSearch
  zh-CN: HeaderSearch
subtitle: 顶部搜索框
cols: 1
order: 8
---

通常作为全局搜索的入口，放置在导航工具条右侧。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 占位文字 | string | -
dataSource | 当前提示内容列表 | string[] | -
onSearch | 搜索补全项的时候调用 | function(value) | -
onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | -
onSelect | 被选中时调用，参数为选中项的 value 值 | function(value) | -
onPressEnter | 按下回车时的回调 | function(value) | -
onVisibleChange | 显示或隐藏文本框的回调 | function(value) |-
defaultOpen | 输入框首次显示是否显示  | boolean | false
open | 控制输入框是否显示 | booelan |false