---
title:
  en-US: Ellipsis 
  zh-CN: Ellipsis
subtitle: 文本自动省略号
cols: 1
order: 10
---

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
tooltip | 移动到 `...` 展示完整内容的提示，在长度截取和覆盖模式的行数截取下可用 | boolean | -
length | 在按照长度截取下的文本最大字符数，超过则截取省略 | number | -
lines | 在按照行数截取下最大的行数，超过则截取省略 | number | `1`
cover | 在按照行数截取下开启覆盖模式，这种模式 `...` 是使用样式覆盖到文本上的，所以文本内容可以是 `ReactNode` | boolean | false
suffixColor | 在覆盖模式下后缀符号 `...` 的背景颜色 | string | `#fff`
suffixOffset | 在覆盖下后缀符号 `...` 位置偏移量，用于更精细的调整截取位置 | number | `0`
