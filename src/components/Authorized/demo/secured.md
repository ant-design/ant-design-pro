---
order: 3
title: 
  zh-CN: 注解基本使用
  en-US: Basic use secured
---

secured demo used

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const { Secured } = RenderAuthorized('user');

@Secured('admin')
class TestSecuredString extends React.Component {
  render() {
    return (
      <Alert message="user Passed!" type="success" showIcon />;
    )
  }
}
ReactDOM.render(
  <div>
    <TestSecuredString />
  </div>,
  mountNode,
);
```
