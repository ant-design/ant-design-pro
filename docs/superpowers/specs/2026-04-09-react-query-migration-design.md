# React-Query 迁移设计

## 背景

将 ant-design-pro 项目的数据获取方式从 `@umijs/max` 的 `useRequest`（基于 ahooks）迁移到 react-query。

参考文档：https://umijs.org/docs/max/react-query

## 配置变更

启用 react-query：

```ts
// .umirc.ts
export default {
  reactQuery: {},
}
```

## API 差异对照

### useRequest → useQuery

```ts
// 之前
const { data, loading } = useRequest(() => queryUserList());

// 之后
const { data, isLoading } = useQuery({
  queryKey: ['userList'],
  queryFn: () => queryUserList(),
});
```

### useRequest (manual) → useMutation

```ts
// 之前
const { run: addUser } = useRequest(addUserApi, { manual: true });
addUser({ name: 'test' });

// 之后
const { mutate: addUser } = useMutation(addUserApi);
addUser({ name: 'test' });
```

### 条件执行

```ts
// 之前
const { data } = useRequest(() => queryUser(id), { ready: !!id });

// 之后
const { data } = useQuery({
  queryKey: ['user', id],
  queryFn: () => queryUser(id),
  enabled: !!id,
});
```

## 返回值映射

| useRequest | react-query |
|---|---|
| `loading` | `isLoading` |
| `data` | `data` |
| `error` | `error` |
| `run` / `mutate` | `mutate` |
| `params` | `variables` |
| `refresh` | `refetch` |

## 迁移文件清单

1. `src/app.tsx` - 移除 useRequest 引用
2. `src/pages/user/register/index.tsx`
3. `src/pages/dashboard/workplace/index.tsx`
4. `src/pages/profile/advanced/index.tsx`
5. `src/pages/form/basic-form/index.tsx`
6. `src/pages/account/settings/components/base.tsx`
7. `src/pages/list/search/projects/index.tsx`
8. `src/pages/list/search/applications/index.tsx`
9. `src/pages/list/card-list/index.tsx`
10. `src/pages/account/center/index.tsx`
11. `src/pages/account/center/components/Projects/index.tsx`
12. `src/pages/profile/basic/index.tsx`
13. `src/pages/dashboard/monitor/index.tsx`
14. `src/pages/dashboard/analysis/index.tsx`
15. `src/pages/list/search/articles/index.tsx`
16. `src/pages/list/basic-list/index.tsx`
17. `src/pages/account/center/components/Applications/index.tsx`
18. `src/pages/account/center/components/Articles/index.tsx`
19. `src/pages/table-list/index.tsx`
20. `src/pages/table-list/components/UpdateForm.tsx`
21. `src/pages/table-list/components/CreateForm.tsx`

## 注意事项

- conetextHolder 引き続き使用可能
- 为了更好的类型推断，使用明确的 queryKey
- 手动触发 mutations 使用 useMutation