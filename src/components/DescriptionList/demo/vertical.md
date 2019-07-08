---
order: 1
title:
  zh-CN: 垂直型
  en-US: Vertical
---

## zh-CN

垂直布局。

## en-US

Vertical layout.

```jsx
import DescriptionList from 'ant-design-pro/lib/DescriptionList';

const { Description } = DescriptionList;

ReactDOM.render(
  <DescriptionList size="large" title="title" layout="vertical">
    <Description term="Firefox">
      A free, open source, cross-platform, graphical web browser developed by the Mozilla
      Corporation and hundreds of volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform, graphical web browser developed by the Mozilla
      Corporation and hundreds of volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform, graphical web browser developed by the Mozilla
      Corporation and hundreds of volunteers.
    </Description>
  </DescriptionList>,
  mountNode
);
```
