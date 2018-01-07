---
order: 0
title: 
  zh-CN: 基础
  en-US: Basic
---

Simplest of usage.

````jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />

ReactDOM.render(
  <Authorized authority='admin' noMatch={noMatch}>
    <Alert message="Passed!" type="success" showIcon />
  </Authorized>
, mountNode);
````
