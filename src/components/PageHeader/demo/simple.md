---
order: 3
title: Simple
---

简单的页头。

```jsx
<<<<<<< HEAD
import PageHeader from 'ant-design-pro/lib/PageHeader';

const breadcrumbList = [
  {
    title: '一级菜单',
    href: '/',
  },
  {
    title: '二级菜单',
    href: '/',
  },
  {
    title: '三级菜单',
  },
=======
import PageHeader from "ant-design-pro/lib/PageHeader";

const breadcrumbList = [
  {
    title: "一级菜单",
    href: "/"
  },
  {
    title: "二级菜单",
    href: "/"
  },
  {
    title: "三级菜单"
  }
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
];

ReactDOM.render(
  <div>
    <PageHeader title="页面标题" breadcrumbList={breadcrumbList} />
  </div>,
<<<<<<< HEAD
  mountNode,
=======
  mountNode
>>>>>>> prettier  md ,  remove pre-commit prettier .js action
);
```

<style>
#scaffold-src-components-PageHeader-demo-simple .code-box-demo {
  background: #f2f4f5;
}
</style>
