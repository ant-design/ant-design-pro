---
order: 0
title: 演示
iframe: 400
---

浮动固定页脚。

````jsx
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import { Button } from 'antd';

ReactDOM.render(
  <div style={{ background: '#f7f7f7' }}>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <p>页面内容 页面内容 页面内容 页面内容</p>
    <FooterToolbar extra="提示信息">
      <Button type="primary">提交</Button>
      <Button>取消</Button>
    </FooterToolbar>
  </div>
, mountNode);
````
