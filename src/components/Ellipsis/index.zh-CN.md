---
title: Ellipsis
subtitle: 文本自动省略号
cols: 1
order: 10
---

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
tooltip | 移动到文本展示完整内容的提示 | boolean | -
length | 在按照长度截取下的文本最大字符数，超过则截取省略 | number | -
lines | 在按照行数截取下最大的行数，超过则截取省略 | number | `1`
fullWidthRecognition | 是否将全角字符的长度视为2来计算字符串长度 | boolean | -
