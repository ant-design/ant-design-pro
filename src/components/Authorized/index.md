---
title:
  en-US: Authorized
  zh-CN: Authorized
subtitle: 权限
cols: 1
order: 15
---

权限组件，通过比对现有权限与准入权限，决定相关元素的展示。

## API

### RenderAuthorized

`RenderAuthorized: (currentAuthority: string | () => string) => Authorized`

权限组件默认 export RenderAuthorized 函数，它接收当前权限作为参数，返回一个权限对象，该对象提供以下几种使用方式。


### Authorized

最基础的权限控制。

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| children    | 正常渲染的元素，权限判断通过时展示           | ReactNode  | - |
| authority   | 准入权限/权限判断         | `string | array | Promise | (currentAuthority) => boolean | Promise` | - |
| noMatch     | 权限异常渲染元素，权限判断不通过时展示        | ReactNode  | - |

### Authorized.AuthorizedRoute

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| authority     | 准入权限/权限判断         | `string | array | Promise | (currentAuthority) => boolean | Promise` | - |
| redirectPath  | 权限异常时重定向的页面路由                | string  | - |

其余参数与 `Route` 相同。

### Authorized.Secured

注解方式，`@Authorized.Secured(authority, error)`

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| authority     | 准入权限/权限判断         | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| error  | 权限异常时渲染元素                |  ReactNode | <Exception type="403" /> |

### Authorized.check

函数形式的 Authorized，用于某些不能被 HOC 包裹的组件。 `Authorized.check(authority, target, Exception)`
注意：传入一个 Promise 时，无论正确还是错误返回的都是一个 ReactClass。

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| authority     | 准入权限/权限判断         | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| target     | 权限判断通过时渲染的元素         | ReactNode | - |
| Exception  | 权限异常时渲染元素                |  ReactNode | - |
