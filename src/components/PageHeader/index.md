---
title:
  en-US: PageHeader
  zh-CN: 页头
subtitle: 页头
cols: 1
order: 11
---

页头用来声明页面的主题，包含了用户所关注的最重要的信息，使用户可以快速理解当前页面是什么以及它的功能。

## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | title 区域 | ReactNode | - |
| logo | logo区域 | ReactNode | - |
| action | 操作区，位于 title 行的行尾 | ReactNode | - |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于content的右侧 | ReactNode | - |
| routes | 面包屑相关属性，router 的路由栈信息 | object[] | - |
| params | 面包屑相关属性，路由的参数 | object | - |
| breadcrumbList | 面包屑数据，配置了 `routes` `params` 时此属性无效 | array<{title: ReactNode, href?: string}> | - |
| tabList | tab 标题列表 | array<{key: string, tab: ReactNode}> | -  |
| onTabChange | 切换面板的回调 | (key) => void | -  |
| linkElement | 定义链接的元素，默认为 `a`，可传入 react-router 的 Link | string\|ReactElement | - |

> 面包屑的配置方式有两种，一是结合 `react-router`，通过配置 `routes` 及 `params` 实现，类似 [面包屑 Demo](https://ant.design/components/breadcrumb-cn/#components-breadcrumb-demo-router)；二是直接配置 `breadcrumbList`。 你也可以将 `routes` 及 `params` 放到 context 中，`PageHeader` 组件会自动获取。
