---
order: 9
title: 标签云
---

标签云是一套相关的标签以及与此相应的权重展示方式，一般典型的标签云有 30 至 150
个标签，而权重影响使用的字体大小或其他视觉效果。

```jsx
<<<<<<< HEAD
import { TagCloud } from 'ant-design-pro/lib/Charts';
=======
import { TagCloud } from "ant-design-pro/lib/Charts";
>>>>>>> prettier  md ,  remove pre-commit prettier .js action

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
<<<<<<< HEAD
    value: Math.floor(Math.random() * 50) + 20,
=======
    value: Math.floor(Math.random() * 50) + 20
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
  });
}

ReactDOM.render(<TagCloud data={tags} height={200} />, mountNode);
```
