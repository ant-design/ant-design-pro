---
order: 1
title: Vertical
---

垂直布局。

````jsx
import DescriptionList from 'ant-design-pro/lib/DescriptionList';

const { Description } = DescriptionList;

ReactDOM.render(
  <DescriptionList title="title" layout="vertical">
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
    <Description term="Firefox">
      A free, open source, cross-platform,
      graphical web browser developed by the
      Mozilla Corporation and hundreds of
      volunteers.
    </Description>
  </DescriptionList>
, mountNode);
````
