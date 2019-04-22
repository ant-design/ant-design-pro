---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic use
---

Basic use

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

ReactDOM.render(
  <div>
    <Authorized authority="admin" noMatch={noMatch}>
      <Alert message="user Passed!" type="success" showIcon />
    </Authorized>
  </div>,
  mountNode
);
```
