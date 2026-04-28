# Ant Design Pro Welcome Cheatsheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Welcome page with a two-column layout: left side shows a cheatsheet-style Markdown document rendered by @ant-design/x-markdown, right side shows three info cards linking to umi/Ant Design/ProComponents.

**Architecture:** Markdown source files live in `docs/` (zh-CN/en-US), imported via `?raw` query and rendered with `@ant-design/x-markdown`. Welcome.tsx is rewritten to a two-column layout using Flex, with locale-based dynamic import of the correct Markdown file.

**Tech Stack:** React, @ant-design/x-markdown, @ant-design/pro-components (PageContainer), umi's useIntl/useLocale for i18n, Tailwind CSS for layout

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `docs/welcome.zh-CN.md` | Create | Chinese cheatsheet Markdown source |
| `docs/welcome.en-US.md` | Create | English cheatsheet Markdown source |
| `src/pages/Welcome.tsx` | Modify | Rewrite to two-column layout with Markdown rendering + info cards |

---

### Task 1: Create Chinese cheatsheet Markdown file

**Files:**
- Create: `docs/welcome.zh-CN.md`

- [ ] **Step 1: Write the Chinese cheatsheet Markdown**

```markdown
# Ant Design Pro Cheatsheet

## 快速开始

**环境要求：** Node.js >= 20

**创建项目：**

```bash
npx create-umi@latest
# 选择 Ant Design Pro 模板
npm install
```

**目录结构：**

```
├── config/           # 配置文件（路由、代理、主题）
│   ├── config.ts     # 主配置
│   ├── routes.ts     # 路由配置
│   ├── defaultSettings.ts  # 布局主题设置
│   └── proxy.ts      # 开发代理配置
├── mock/             # Mock 数据
├── src/
│   ├── components/   # 公共组件
│   ├── locales/      # 国际化资源
│   ├── models/       # 全局数据模型
│   ├── services/     # API 服务层
│   ├── utils/        # 工具函数
│   ├── access.ts     # 权限定义
│   └── app.tsx       # 运行时配置
├── docs/             # 项目文档
└── types/            # 类型声明
```

**常用命令：**

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器（UMI_ENV=dev，带 Mock） |
| `npm run dev` | 启动开发服务器（无 Mock） |
| `npm run start:dev` | 同 dev，UMI_ENV=dev，无 Mock |
| `npm run start:no-mock` | 无 Mock 启动 |
| `npm run start:pre` | 预发布环境启动 |
| `npm run start:test` | 测试环境启动 |
| `npm run build` | 构建生产产物 |
| `npm run preview` | 构建并本地预览（端口 8000） |
| `npm run analyze` | 构建产物体积分析 |
| `npm run lint` | 代码检查（Biome + TypeScript） |
| `npm run biome` | Biome 自动修复 |
| `npm test` | 运行测试 |
| `npm run test:coverage` | 测试覆盖率 |
| `npm run openapi` | 根据 OpenAPI 生成 API 代码 |
| `npm run simple` | 精简模式启动 |

> 💡 `UMI_ENV` 用于切换环境配置，对应 `config/proxy.ts` 中的不同代理规则。

→ 更多内容见 [umi 入门指南](https://umijs.org/docs/guides/getting-started)

## 路由与菜单

**路由配置** 位于 `config/routes.ts`：

```ts
export default [
  {
    path: '/welcome',
    name: 'welcome',     // 对应 menu.welcome 国际化 key
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',  // 路由级权限控制
    routes: [...],
  },
  { path: '/', redirect: '/dashboard/analysis' },
  { component: '404', path: './*' },
];
```

**路由导航：**

```tsx
import { useNavigate, useParams, useLocation } from '@umijs/max';

const navigate = useNavigate();
navigate('/dashboard');        // 跳转
navigate(-1);                  // 后退

const { id } = useParams();   // 获取动态参数 /user/:id
const location = useLocation(); // 当前路由信息
```

**菜单与权限联动：** 路由配置中 `access` 字段控制菜单可见性，未授权路由不会出现在菜单中。

> 💡 `name` 字段自动映射为 `menu.xxx` 国际化 key，在 `src/locales/` 中配置翻译。

→ 更多内容见 [umi 路由文档](https://umijs.org/docs/guides/routes)、[Umi Max 布局与菜单](https://umijs.org/docs/max/layout-menu)

## 布局

**ProLayout 配置** 位于 `config/defaultSettings.ts`：

```ts
export default {
  navTheme: 'light',        // 导航主题：light / dark
  colorPrimary: '#1890ff',  // 主题色
  layout: 'mix',            // 布局模式：side / top / mix
  contentWidth: 'Fluid',    // 内容宽度：Fluid / Fixed
  fixSiderbar: true,        // 固定侧边栏
};
```

**布局模式：**
- `side` — 左侧导航
- `top` — 顶部导航
- `mix` — 顶部 + 侧边混合导航

**页面容器：**

```tsx
import { PageContainer } from '@ant-design/pro-components';

const Page = () => (
  <PageContainer
    header={{ title: '页面标题' }}
    content="页面描述"
  >
    {/* 页面内容 */}
  </PageContainer>
);
```

**自定义区域：** 右上角 `src/components/RightContent`，底部 `src/components/Footer`。

→ 更多内容见 [Umi Max 布局与菜单](https://umijs.org/docs/max/layout-menu)

## 数据流

**useModel — 轻量全局状态：** 在 `src/models/` 下创建文件即自动注册：

```ts
// src/models/counter.ts
import { useState } from 'react';

export default function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

```tsx
// 任意组件中使用
import { useModel } from '@umijs/max';

const { count, increment } = useModel('counter');
```

**useRequest — 数据请求：**

```tsx
import { useRequest } from '@umijs/max';

const { data, loading, error } = useRequest(getUserInfo);
```

**React Query — 服务端状态管理：**

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 查询
const { data, isLoading } = useQuery({
  queryKey: ['user', id],
  queryFn: () => getUser(id),
});

// 变更
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
});
```

**初始状态 — getInitialState：** 在 `src/app.tsx` 中定义，全局可访问：

```tsx
// src/app.tsx
export async function getInitialState() {
  const currentUser = await fetchUserInfo();
  return { currentUser };
}

// 组件中使用
import { useModel } from '@umijs/max';
const { initialState } = useModel('@@initialState');
```

> 💡 `getInitialState` 在应用启动时执行一次，适合获取全局信息（如用户身份、权限）。

→ 更多内容见 [Umi Max 数据流](https://umijs.org/docs/max/data-flow)

## 请求

**请求配置** 位于 `src/app.tsx`：

```ts
export const request: RequestConfig = {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  requestInterceptors: [],   // 请求拦截器
  responseInterceptors: [],  // 响应拦截器
};
```

**错误处理** 位于 `src/requestErrorConfig.ts`，可自定义错误码映射和提示逻辑。

**使用请求：**

```tsx
import { request } from '@umijs/max';

// GET
const data = await request('/api/users', { params: { page: 1 } });

// POST
await request('/api/users', { method: 'POST', data: { name: 'test' } });
```

**OpenAPI 代码生成：**

```bash
npm run openapi
```

根据 `config/oneapi.json` 自动生成 `src/services/` 下的 API 调用代码。

> 💡 生成后的代码直接用 `import { request } from '@umijs/max'` 发起请求，无需手动封装。

→ 更多内容见 [Umi Max 请求](https://umijs.org/docs/max/request)

## 权限

**定义权限** 在 `src/access.ts`：

```ts
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    canAdmin: currentUser?.access === 'admin',
    canUser: !!currentUser,
  };
}
```

**路由级权限：** 在路由配置中添加 `access` 字段：

```ts
{ path: '/admin', access: 'canAdmin' }
```

**组件级权限：**

```tsx
import { Access, useAccess } from '@umijs/max';

// 声明式
<Access accessible={access.canAdmin}>
  <AdminPanel />
</Access>

// 命令式
const access = useAccess();
if (access.canAdmin) { /* ... */ }
```

→ 更多内容见 [Umi Max 权限](https://umijs.org/docs/max/access)

## 国际化

**配置** 在 `config/config.ts`：

```ts
locale: {
  default: 'zh-CN',
  antd: true,         // 同步 antd 组件语言
  baseNavigator: true, // 跟随浏览器语言
},
```

**文件结构：**

```
src/locales/
├── zh-CN.ts        # 中文入口
├── zh-CN/
│   ├── menu.ts     # 菜单翻译
│   ├── pages.ts    # 页面翻译
│   └── ...
├── en-US.ts        # 英文入口
└── en-US/
    └── ...
```

**使用方式：**

```tsx
import { useIntl, FormattedMessage } from '@umijs/max';

// Hook 方式
const intl = useIntl();
intl.formatMessage({ id: 'menu.welcome' });

// 组件方式
<FormattedMessage id="menu.welcome" />
```

**切换语言：**

```tsx
import { setLocale } from '@umijs/max';
setLocale('en-US', false);  // false = 不刷新页面
```

→ 更多内容见 [Umi Max 国际化](https://umijs.org/docs/max/i18n)

## 样式

**CSS Modules：** 文件命名为 `*.module.less` 或 `*.module.css`：

```css
/* example.module.less */
.container { padding: 24px; }
.title { font-size: 16px; }
```

```tsx
import styles from './example.module.less';
<div className={styles.container} />
```

**antd-style（CSS-in-JS）：**

```tsx
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
}));

const { styles } = useStyles();
<div className={styles.card} />
```

**Tailwind CSS（v4）：** 直接在 className 中使用：

```tsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-[#141414]" />
```

**动态主题：** 在 `config/config.ts` 的 `antd` 配置中设置：

```ts
antd: {
  configProvider: {
    theme: {
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
      },
    },
  },
},
```

开发环境可通过右下角 SettingDrawer 实时切换主题。

> 💡 三种样式方案可以共存：Tailwind 适合布局、CSS Modules 适合组件样式、antd-style 适合需要消费主题 token 的场景。

→ 更多内容见 [umi 样式文档](https://umijs.org/docs/guides/styling)、[Umi Max antd 动态主题](https://umijs.org/docs/max/antd#%E5%8A%A8%E6%80%81%E4%B8%BB%E9%A2%98)

## 测试 & 调试

**Jest 测试：**

```bash
npm test                    # 运行所有测试
npm run test:coverage       # 带覆盖率报告
npm run test:update         # 更新快照
```

测试文件放在对应组件目录下，命名为 `*.test.ts(x)`。

**Mock 数据：** 在 `mock/` 目录下创建文件：

```ts
// mock/user.ts
export default {
  'GET /api/currentUser': { name: 'Serati Ma', access: 'admin' },
  'POST /api/login': (req, res) => { res.end('ok'); },
};
```

Umi 自动注册 mock，开发模式下生效。

**代理配置** 位于 `config/proxy.ts`：

```ts
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
};
```

> 💡 用 `MOCK=none` 启动可跳过 Mock，直接代理到后端：`npm run start:no-mock`。

→ 更多内容见 [umi 测试](https://umijs.org/docs/guides/testing)、[umi Mock](https://umijs.org/docs/guides/mock)

## FAQ

**Q: 如何关闭 Mock？**
`npm run start:no-mock` 或 `cross-env MOCK=none max dev`

**Q: 如何修改主题色？**
修改 `config/defaultSettings.ts` 的 `colorPrimary`，开发时可用 SettingDrawer 实时调整。

**Q: 如何添加新页面？**
1. 在 `src/pages/` 下创建组件 2. 在 `config/routes.ts` 添加路由 3. 在 `src/locales/` 添加菜单翻译（如需）

**Q: 如何添加全局状态？**
在 `src/models/` 下创建文件，导出自定义 Hook，组件中通过 `useModel('文件名')` 使用。

**Q: 如何部署？**
`npm run build` 生成 `dist/` 目录，部署到任意静态服务器。配置 `publicPath` 处理非根目录部署。

**Q: 如何使用 OpenAPI 代码生成？**
1. 在 `config/config.ts` 配置 `openAPI` 2. 运行 `npm run openapi` 3. 自动生成 `src/services/` 下的代码

→ 更多内容见 [umi FAQ](https://umijs.org/docs/guides/faq)
```

- [ ] **Step 2: Commit**

```bash
git add docs/welcome.zh-CN.md
git commit -m "docs: add Chinese cheatsheet for Welcome page"
```

---

### Task 2: Create English cheatsheet Markdown file

**Files:**
- Create: `docs/welcome.en-US.md`

- [ ] **Step 1: Write the English cheatsheet Markdown**

```markdown
# Ant Design Pro Cheatsheet

## Getting Started

**Requirements:** Node.js >= 20

**Create a project:**

```bash
npx create-umi@latest
# Select Ant Design Pro template
npm install
```

**Directory structure:**

```
├── config/           # Configuration (routes, proxy, theme)
│   ├── config.ts     # Main config
│   ├── routes.ts     # Route definitions
│   ├── defaultSettings.ts  # Layout & theme settings
│   └── proxy.ts      # Dev proxy config
├── mock/             # Mock data
├── src/
│   ├── components/   # Shared components
│   ├── locales/      # i18n resources
│   ├── models/       # Global data models
│   ├── services/     # API service layer
│   ├── utils/        # Utility functions
│   ├── access.ts     # Permission definitions
│   └── app.tsx       # Runtime configuration
├── docs/             # Project documentation
└── types/            # Type declarations
```

**Common commands:**

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server (UMI_ENV=dev, with Mock) |
| `npm run dev` | Start dev server (no Mock) |
| `npm run start:dev` | Same as dev, UMI_ENV=dev, no Mock |
| `npm run start:no-mock` | Start without Mock |
| `npm run start:pre` | Pre-production environment |
| `npm run start:test` | Test environment |
| `npm run build` | Build for production |
| `npm run preview` | Build and preview locally (port 8000) |
| `npm run analyze` | Analyze bundle size |
| `npm run lint` | Lint (Biome + TypeScript) |
| `npm run biome` | Auto-fix with Biome |
| `npm test` | Run tests |
| `npm run test:coverage` | Test with coverage |
| `npm run openapi` | Generate API code from OpenAPI schema |
| `npm run simple` | Start in minimal mode |

> 💡 `UMI_ENV` switches environment configs, mapping to different proxy rules in `config/proxy.ts`.

→ See [umi Getting Started](https://umijs.org/docs/guides/getting-started)

## Routes & Menu

**Route config** is in `config/routes.ts`:

```ts
export default [
  {
    path: '/welcome',
    name: 'welcome',     // maps to menu.welcome i18n key
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',  // route-level access control
    routes: [...],
  },
  { path: '/', redirect: '/dashboard/analysis' },
  { component: '404', path: './*' },
];
```

**Route navigation:**

```tsx
import { useNavigate, useParams, useLocation } from '@umijs/max';

const navigate = useNavigate();
navigate('/dashboard');        // navigate
navigate(-1);                  // go back

const { id } = useParams();   // dynamic param /user/:id
const location = useLocation(); // current route info
```

**Menu & access:** The `access` field in route config controls menu visibility — unauthorized routes won't appear in the menu.

> 💡 The `name` field is automatically mapped to `menu.xxx` i18n keys. Configure translations in `src/locales/`.

→ See [umi Routes](https://umijs.org/docs/guides/routes), [Umi Max Layout & Menu](https://umijs.org/docs/max/layout-menu)

## Layout

**ProLayout config** is in `config/defaultSettings.ts`:

```ts
export default {
  navTheme: 'light',        // nav theme: light / dark
  colorPrimary: '#1890ff',  // primary color
  layout: 'mix',            // layout mode: side / top / mix
  contentWidth: 'Fluid',    // content width: Fluid / Fixed
  fixSiderbar: true,        // fixed sidebar
};
```

**Layout modes:**
- `side` — Side navigation
- `top` — Top navigation
- `mix` — Top + side mixed navigation

**Page container:**

```tsx
import { PageContainer } from '@ant-design/pro-components';

const Page = () => (
  <PageContainer
    header={{ title: 'Page Title' }}
    content="Page description"
  >
    {/* Page content */}
  </PageContainer>
);
```

**Custom areas:** Top-right `src/components/RightContent`, footer `src/components/Footer`.

→ See [Umi Max Layout & Menu](https://umijs.org/docs/max/layout-menu)

## Data Flow

**useModel — lightweight global state:** Create a file in `src/models/` to auto-register:

```ts
// src/models/counter.ts
import { useState } from 'react';

export default function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

```tsx
// Use in any component
import { useModel } from '@umijs/max';

const { count, increment } = useModel('counter');
```

**useRequest — data fetching:**

```tsx
import { useRequest } from '@umijs/max';

const { data, loading, error } = useRequest(getUserInfo);
```

**React Query — server state management:**

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query
const { data, isLoading } = useQuery({
  queryKey: ['user', id],
  queryFn: () => getUser(id),
});

// Mutation
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
});
```

**Initial state — getInitialState:** Define in `src/app.tsx`, accessible globally:

```tsx
// src/app.tsx
export async function getInitialState() {
  const currentUser = await fetchUserInfo();
  return { currentUser };
}

// Use in components
import { useModel } from '@umijs/max';
const { initialState } = useModel('@@initialState');
```

> 💡 `getInitialState` runs once on app startup, ideal for fetching global info (user identity, permissions).

→ See [Umi Max Data Flow](https://umijs.org/docs/max/data-flow)

## Request

**Request config** is in `src/app.tsx`:

```ts
export const request: RequestConfig = {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  requestInterceptors: [],   // request interceptors
  responseInterceptors: [],  // response interceptors
};
```

**Error handling** is in `src/requestErrorConfig.ts`, customize error code mapping and notification logic.

**Using request:**

```tsx
import { request } from '@umijs/max';

// GET
const data = await request('/api/users', { params: { page: 1 } });

// POST
await request('/api/users', { method: 'POST', data: { name: 'test' } });
```

**OpenAPI code generation:**

```bash
npm run openapi
```

Auto-generates API calling code under `src/services/` based on `config/oneapi.json`.

> 💡 Generated code uses `import { request } from '@umijs/max'` directly — no manual wrapping needed.

→ See [Umi Max Request](https://umijs.org/docs/max/request)

## Access Control

**Define permissions** in `src/access.ts`:

```ts
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    canAdmin: currentUser?.access === 'admin',
    canUser: !!currentUser,
  };
}
```

**Route-level access:** Add `access` field in route config:

```ts
{ path: '/admin', access: 'canAdmin' }
```

**Component-level access:**

```tsx
import { Access, useAccess } from '@umijs/max';

// Declarative
<Access accessible={access.canAdmin}>
  <AdminPanel />
</Access>

// Imperative
const access = useAccess();
if (access.canAdmin) { /* ... */ }
```

→ See [Umi Max Access](https://umijs.org/docs/max/access)

## Internationalization

**Config** in `config/config.ts`:

```ts
locale: {
  default: 'zh-CN',
  antd: true,         // sync antd component locale
  baseNavigator: true, // follow browser language
},
```

**File structure:**

```
src/locales/
├── zh-CN.ts        # Chinese entry
├── zh-CN/
│   ├── menu.ts     # Menu translations
│   ├── pages.ts    # Page translations
│   └── ...
├── en-US.ts        # English entry
└── en-US/
    └── ...
```

**Usage:**

```tsx
import { useIntl, FormattedMessage } from '@umijs/max';

// Hook
const intl = useIntl();
intl.formatMessage({ id: 'menu.welcome' });

// Component
<FormattedMessage id="menu.welcome" />
```

**Switch locale:**

```tsx
import { setLocale } from '@umijs/max';
setLocale('en-US', false);  // false = no page reload
```

→ See [Umi Max i18n](https://umijs.org/docs/max/i18n)

## Styling

**CSS Modules:** Name files `*.module.less` or `*.module.css`:

```css
/* example.module.less */
.container { padding: 24px; }
.title { font-size: 16px; }
```

```tsx
import styles from './example.module.less';
<div className={styles.container} />
```

**antd-style (CSS-in-JS):**

```tsx
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
}));

const { styles } = useStyles();
<div className={styles.card} />
```

**Tailwind CSS (v4):** Use directly in className:

```tsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-[#141414]" />
```

**Dynamic theme:** Set in `config/config.ts` `antd` config:

```ts
antd: {
  configProvider: {
    theme: {
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
      },
    },
  },
},
```

Use SettingDrawer in dev mode to switch themes in real-time.

> 💡 Three styling approaches can coexist: Tailwind for layout, CSS Modules for component styles, antd-style when consuming theme tokens.

→ See [umi Styling](https://umijs.org/docs/guides/styling), [Umi Max antd Dynamic Theme](https://umijs.org/docs/max/antd#%E5%8A%A8%E6%80%81%E4%B8%BB%E9%A2%98)

## Testing & Debugging

**Jest testing:**

```bash
npm test                    # Run all tests
npm run test:coverage       # With coverage report
npm run test:update         # Update snapshots
```

Test files go next to the component, named `*.test.ts(x)`.

**Mock data:** Create files in `mock/`:

```ts
// mock/user.ts
export default {
  'GET /api/currentUser': { name: 'Serati Ma', access: 'admin' },
  'POST /api/login': (req, res) => { res.end('ok'); },
};
```

Umi auto-registers mocks, active in dev mode.

**Proxy config** is in `config/proxy.ts`:

```ts
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
};
```

> 💡 Use `MOCK=none` to skip mock and proxy to backend: `npm run start:no-mock`.

→ See [umi Testing](https://umijs.org/docs/guides/testing), [umi Mock](https://umijs.org/docs/guides/mock)

## FAQ

**Q: How to disable Mock?**
`npm run start:no-mock` or `cross-env MOCK=none max dev`

**Q: How to change the primary color?**
Edit `colorPrimary` in `config/defaultSettings.ts`. Use SettingDrawer for live preview in dev mode.

**Q: How to add a new page?**
1. Create component in `src/pages/` 2. Add route in `config/routes.ts` 3. Add menu translation in `src/locales/` (if needed)

**Q: How to add global state?**
Create a file in `src/models/` exporting a custom Hook, then use `useModel('filename')` in components.

**Q: How to deploy?**
`npm run build` generates `dist/`. Deploy to any static file server. Set `publicPath` for non-root deployments.

**Q: How to use OpenAPI code generation?**
1. Configure `openAPI` in `config/config.ts` 2. Run `npm run openapi` 3. Code is auto-generated under `src/services/`

→ See [umi FAQ](https://umijs.org/docs/guides/faq)
```

- [ ] **Step 2: Commit**

```bash
git add docs/welcome.en-US.md
git commit -m "docs: add English cheatsheet for Welcome page"
```

---

### Task 3: Rewrite Welcome page with two-column layout

**Files:**
- Modify: `src/pages/Welcome.tsx`

- [ ] **Step 1: Rewrite Welcome.tsx**

The new layout: left side (2/3 width) is a Markdown cheatsheet card, right side (1/3 width) is three InfoCard links. Uses `@ant-design/x-markdown` for rendering and dynamic `?raw` import for locale-based Markdown loading.

```tsx
import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import { useLocale } from '@umijs/max';
import React, { useEffect, useState } from 'react';

import enUS from '../../docs/welcome.en-US.md?raw';
import zhCN from '../../docs/welcome.zh-CN.md?raw';

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="block h-full rounded-lg border border-solid border-gray-200 p-5 transition-shadow hover:shadow-md dark:border-gray-700"
  >
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-2xl font-bold text-white">
        {index}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="mb-2 mt-0 text-base font-semibold">{title}</h4>
        <p className="mb-0 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>
    </div>
  </a>
);

const mdContent: Record<string, string> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const Welcome: React.FC = () => {
  const { locale } = useLocale();
  const [content, setContent] = useState(mdContent[locale] || mdContent['zh-CN']);

  useEffect(() => {
    setContent(mdContent[locale] || mdContent['zh-CN']);
  }, [locale]);

  return (
    <PageContainer>
      <div className="flex gap-6">
        <div className="min-w-0 flex-[2]">
          <div className="rounded-lg border border-solid border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#141414]">
            <XMarkdown>{content}</XMarkdown>
          </div>
        </div>
        <div className="flex flex-[1] flex-col gap-6">
          <InfoCard
            index={1}
            href="https://umijs.org/docs/introduce/introduce"
            title={locale === 'zh-CN' ? '了解 umi' : 'Learn umi'}
            desc={
              locale === 'zh-CN'
                ? 'umi 是一个可扩展的企业级前端应用框架，以路由为基础，支持配置式路由和约定式路由。'
                : 'umi is an extensible enterprise-level frontend framework based on routing, supporting both config-based and convention-based routes.'
            }
          />
          <InfoCard
            index={2}
            title={locale === 'zh-CN' ? '了解 Ant Design' : 'Learn Ant Design'}
            href="https://ant.design"
            desc={
              locale === 'zh-CN'
                ? 'antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。'
                : 'antd is a React UI component library based on the Ant Design system, mainly for enterprise-level mid-end products.'
            }
          />
          <InfoCard
            index={3}
            title={locale === 'zh-CN' ? '了解 Pro Components' : 'Learn Pro Components'}
            href="https://procomponents.ant.design"
            desc={
              locale === 'zh-CN'
                ? 'ProComponents 是基于 Ant Design 的高抽象模板组件，以一个组件就是一个页面为开发理念。'
                : 'ProComponents provides higher-abstraction template components on top of Ant Design, with one-component-one-page philosophy.'
            }
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
```

- [ ] **Step 2: Start dev server to verify**

Run: `npm start`
Expected: Welcome page at `/welcome` shows left cheatsheet + right info cards, switching locale updates Markdown content.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Welcome.tsx
git commit -m "feat: rewrite Welcome page with cheatsheet and two-column layout"
```