---
order: 1
title: 
  zh-CN: 注解
  en-US: secured
---

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const { Secured } = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

const havePermission = () => {
  return false;
};

const havePermissionAsync = new Promise((resolve, reject) => {
  // Call reslove on behalf of passed
  setTimeout(() => reslove(), 1000);
});

@Secured('admin', noMatch)
class TestSecuredString extends React.Component {
  render() {
    <Alert message="user Passed!" type="success" showIcon />;
  }
}

@Secured(['user', 'admin'], noMatch)
class TestSecuredArray extends React.Component {
  render() {
    <Alert
      message="Use Array as a parameter passed!"
      type="success"
      showIcon
    />;
  }
}

@Secured(havePermission, noMatch)
class TestSecuredFunction extends React.Component {
  render() {
    <Alert
      message="Use function as a parameter passed!"
      type="success"
      showIcon
    />;
  }
}

@Secured(havePermissionAsync, noMatch)
class TestSecuredPromise extends React.Component {
  render() {
    <Alert
      message="Use Promise as a parameter passed!"
      type="success"
      showIcon
    />;
  }
}

ReactDOM.render(
  <div>
    <TestSecuredString />
    <TestSecuredArray />
    <TestSecuredFunction />
    <TestSecuredPromise />
  </div>,
  mountNode,
);
```
