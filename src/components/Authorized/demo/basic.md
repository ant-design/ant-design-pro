---
order: 0
title: 
  zh-CN: 基础
  en-US: Basic
---

Simplest of usage.

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

ReactDOM.render(
  <Authorized authority="admin" noMatch={noMatch}>
    <Alert message="Passed!" type="success" showIcon />
  </Authorized>
  mountNode,
);
```

user Array

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

ReactDOM.render(
  <Authorized authority={['user','admin']} noMatch={noMatch}>
    <Alert message="Passed!" type="success" showIcon />
  </Authorized>
  mountNode,
);
```

user Funtion

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

const Havepermission = () => {
  return false;
};

ReactDOM.render(
  <Authorized authority={Havepermission} noMatch={noMatch}>
    <Alert message="Passed!" type="success" showIcon />
  </Authorized>
  mountNode,
);
```


user Promise

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

const Havepermission = new Promise((reslove,reject)=>{
  // Call reslove on behalf of passed
  setTimeout(()=>reslove(),1000)
});

ReactDOM.render(
  <Authorized authority={Havepermission} noMatch={noMatch}>
    <Alert message="Passed!" type="success" showIcon />
  </Authorized>
  mountNode,
);
```
