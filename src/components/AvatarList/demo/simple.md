---
order: 0
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

```jsx
import AvatarList from 'ant-design-pro/lib/AvatarList';

ReactDOM.render(
  <AvatarList size="mini">
    <AvatarList.Item
      tips="Jake"
      src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"
    />
    <AvatarList.Item
      tips="Andy"
      src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
    />
    <AvatarList.Item
      tips="Niko"
      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
    />
  </AvatarList>,
  mountNode
);
```
