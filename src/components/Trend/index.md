---
title: 
  en-US: Trend
  zh-CN: Trend
subtitle: 趋势标记
cols: 1
order: 14
---

趋势符号，标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外。

## API

```html
<Trend flag="up">50%</Trend>
```

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| colorful | 是否彩色标记 | Boolean | true |
| flag | 上升下降标识：`up|down` | string | - |
