---
order: 9
title: 标签云
---

标签云是一套相关的标签以及与此相应的权重展示方式，一般典型的标签云有 30 至 150 个标签，而权重影响使用的字体大小或其他视觉效果。

```jsx
import { TagCloud } from 'ant-design-pro/lib/Charts';

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor(Math.random() * 50) + 20,
  });
}

ReactDOM.render(<TagCloud data={tags} height={200} />, mountNode);
```
