---
order: 0
title: Structure
---

基本结构，具备响应式布局功能，主要断点为 768px 和 576px，拖动窗口改变大小试试看
。

```jsx
<<<<<<< HEAD
import PageHeader from 'ant-design-pro/lib/PageHeader';

const breadcrumbList = [
  {
    title: '面包屑',
  },
=======
import PageHeader from "ant-design-pro/lib/PageHeader";

const breadcrumbList = [
  {
    title: "面包屑"
  }
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
];

const tabList = [
  {
<<<<<<< HEAD
    key: '1',
    tab: '页签一',
  },
  {
    key: '2',
    tab: '页签二',
  },
  {
    key: '3',
    tab: '页签三',
  },
=======
    key: "1",
    tab: "页签一"
  },
  {
    key: "2",
    tab: "页签二"
  },
  {
    key: "3",
    tab: "页签三"
  }
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
];

ReactDOM.render(
  <div>
    <PageHeader
      className="tabs"
      title={<div className="title">Title</div>}
      logo={<div className="logo">logo</div>}
      action={<div className="action">action</div>}
      content={<div className="content">content</div>}
      extraContent={<div className="extraContent">extraContent</div>}
      breadcrumbList={breadcrumbList}
      tabList={tabList}
    />
  </div>,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```

<style>
#scaffold-src-components-PageHeader-demo-structure .code-box-demo {
  background: #f2f4f5;
}
#scaffold-src-components-PageHeader-demo-structure .logo {
  background: #3ba0e9;
  color: #fff;
  height: 100%;
}
#scaffold-src-components-PageHeader-demo-structure .title {
  background: rgba(16, 142, 233, 1);
  color: #fff;
}
#scaffold-src-components-PageHeader-demo-structure .action {
  background: #7dbcea;
  color: #fff;
}
#scaffold-src-components-PageHeader-demo-structure .content {
  background: #7dbcea;
  color: #fff;
}
#scaffold-src-components-PageHeader-demo-structure .extraContent {
  background: #7dbcea;
  color: #fff;
}
</style>
