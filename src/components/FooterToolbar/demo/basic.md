---
order: 0
title:
  - zh-CN: 演示
  - en-US: demo
iframe: 400
---

## zh-CN

浮动固定页脚。

## en-US

Fixed to the footer.

## zh-CN

````jsx
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import { Button } from 'antd';

ReactDOM.render(
  <div style={{ background: '#f7f7f7', padding: 24 }}>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <FooterToolbar extra="提示信息">
      <Button>取消</Button>
      <Button type="primary">提交</Button>
    </FooterToolbar>
  </div>
, mountNode);
````

## en-US

````jsx
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
  </div>
, mountNode);
````