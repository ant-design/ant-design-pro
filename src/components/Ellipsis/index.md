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
text | 在按照文本长度截取下的文本内容 | ReactNode\|string | -
tooltip | 在按照文本长度截取下展示完整内容的提示 | ReactNode\|string | -
length | 在按照文本长度截取下的文本最大字符数，超过则截取省略 | ReactNode\|string | -
lines | 在按照文本行数截取下最大的行数，超过则截取省略 | ReactNode\|string | `1`
suffixColor | 在按照文本行数截取下后缀符号 `...` 的背景颜色 | ReactNode\|string | `#fff`
suffixOffset | 在按照文本行数截取下后缀符号 `...` 位置偏移量，用于更精细的调整截取位置 | ReactNode\|string | `0`
