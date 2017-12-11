---
order: 0
title: 演示
iframe: 400
---

基本页脚。

```jsx
<<<<<<< HEAD
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { Icon } from 'antd';

const links = [
  {
    title: '帮助',
    href: '',
  },
  {
    title: '隐私',
    href: '',
  },
  {
    title: '条款',
    href: '',
    blankTarget: true,
  },
=======
import GlobalFooter from "ant-design-pro/lib/GlobalFooter";
import { Icon } from "antd";

const links = [
  {
    title: "帮助",
    href: ""
  },
  {
    title: "隐私",
    href: ""
  },
  {
    title: "条款",
    href: "",
    blankTarget: true
  }
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
  </div>
);

ReactDOM.render(
  <div style={{ background: "#f5f5f5", overflow: "hidden" }}>
    <div style={{ height: 280 }} />
    <GlobalFooter links={links} copyright={copyright} />
  </div>,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```
