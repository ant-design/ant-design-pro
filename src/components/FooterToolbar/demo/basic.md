---
order: 0
title:
  zh-CN: 演示
  en-US: demo
iframe: 400
---

## zh-CN

浮动固定页脚。

## en-US

Fixed to the footer.

```jsx
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import { Button } from 'antd';

ReactDOM.render(
  <div style={{ background: '#f7f7f7', padding: 24 }}>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <FooterToolbar extra="extra information">
      <Button>Cancel</Button>
      <Button type="primary">Submit</Button>
    </FooterToolbar>
  </div>,
  mountNode
);
```
