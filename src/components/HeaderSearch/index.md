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
onSearch | 选择某项或按下回车时的回调 | function(value) | -
onChange | 输入搜索字符的回调 | function(value) | -
onPressEnter | 按下回车时的回调 | function(value) | -
