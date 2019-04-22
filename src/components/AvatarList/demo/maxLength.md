---
order: 0
title:
  zh-CN: 要显示的最大项目
  en-US: Max Items to Show
---

`maxLength` attribute specifies the maximum number of items to show while `excessItemsStyle` style the excess item component.

```jsx
import AvatarList from 'ant-design-pro/lib/AvatarList';

ReactDOM.render(
  <AvatarList
    size="mini"
    maxLength={3}
    excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
  >
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
    <AvatarList.Item
      tips="Niko"
      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
    />
    <AvatarList.Item
      tips="Niko"
      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
    />
    <AvatarList.Item
      tips="Niko"
      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
    />
  </AvatarList>,
  mountNode
);
```
