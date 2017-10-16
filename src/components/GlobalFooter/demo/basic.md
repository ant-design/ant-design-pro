---
order: 0
title: 演示
iframe: 400
---

基本页脚。

````jsx
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { Icon } from 'antd';

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
  blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>;

ReactDOM.render(
  <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
    <GlobalFooter links={links} copyright={copyright} />
  </div>
, mountNode);
````
