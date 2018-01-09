---
order: 0
title: 
  zh-CN: 基础
  en-US: Basic
---

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;


const havePermission = () => {
  return false;
};

const havePermissionAsync = new Promise((resolve,reject)=>{
  // Call reslove on behalf of passed
  setTimeout(()=>reslove(),1000)
});

ReactDOM.render(
  <div>
    <Authorized authority="admin" noMatch={noMatch}>
      <Alert message="user Passed!" type="success" showIcon />
    </Authorized>
    <Authorized authority={['user','admin']} noMatch={noMatch}>
      <Alert message="Use Array as a parameter passed!" type="success" showIcon />
    </Authorized>
    <Authorized authority={Havepermission} noMatch={noMatch}>
      <Alert message="Use function as a parameter passed!" type="success" showIcon />
    </Authorized>
    <Authorized authority={havePermissionAsync} noMatch={noMatch}>
      <Alert message="Use Promise as a parameter passed!" type="success" showIcon />
    </Authorized>
  </div>
  mountNode,
);
```
