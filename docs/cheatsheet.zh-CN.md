# Ant Design Pro Cheatsheet

[![GitHub](https://img.shields.io/badge/GitHub-ant--design%2Fant--design--pro-181717?logo=github)](https://github.com/ant-design/ant-design-pro) [![Stars](https://img.shields.io/github/stars/ant-design/ant-design-pro?style=social)](https://github.com/ant-design/ant-design-pro) [![Version](https://img.shields.io/github/package-json/v/ant-design/ant-design-pro)](https://github.com/ant-design/ant-design-pro/releases) [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

![Ant Design Pro](https://mdn.alipayobjects.com/huamei_fkc4p0/afts/img/A*EX3ISYC2ghEAAAAAddAAAAgAeobDAQ/original)

## 🎉 v6 新特性

- **React 19 + antd 6 + Umi Max 4**：全面升级到最新技术栈，utoopack（Turbopack）构建
- **样式重构**：Less → Tailwind CSS v4 + antd-style + CSS Modules，启用 CSS 变量主题
- **AI 助手页面**：基于 Ant Design X 的聊天界面示例
- **React Query**：从 useRequest 迁移到 @tanstack/react-query
- **Biome**：替代 ESLint + Prettier，统一 lint 和格式化
- **Cloudflare Worker 后端**：演示 API 独立部署，基于 Hono 框架
- **更多**：路由预加载、骨架屏 Loading、D3 地图、Cheatsheet 速查文档、moment → dayjs、Class → 函数式组件

→ [查看完整更新日志](https://github.com/ant-design/ant-design-pro/releases/tag/v6.0.0)

## 快速开始

**创建项目：**

```bash
git clone --depth 1 https://github.com/ant-design/ant-design-pro.git my-project
cd my-project
npm install
```

项目提供两种模式：

- **完整模式**：包含所有示例页面（Dashboard、表单、列表、权限等），适合参考学习
- **精简模式**：仅保留登录页和基础布局，适合从零开发

切换精简模式：

```bash
git add -A && git commit -m "chore: save before simple"  # 先提交，以便回退
npm run simple                                             # 删除示例页面和多余依赖
npm install                                                # 更新依赖
```

> 💡 建议先用完整模式熟悉项目结构，再切换精简模式开始开发。

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
| `npm run dev` | 启动开发服务器（UMI_ENV=dev，无 Mock） |
| `npm run start:no-mock` | 无 Mock 启动 |
| `npm run start:pre` | 预发布环境启动 |
| `npm run start:test` | 测试环境启动 |
| `npm run build` | 构建生产产物 |
| `npm run preview` | 预览已构建产物（需先 `npm run build`，端口 8000） |
| `npm run preview:build` | 构建并本地预览（端口 8000） |
| `npm run deploy` | 构建并部署到 GitHub Pages |
| `npm run analyze` | 构建产物体积分析 |
| `npm run lint` | 代码检查（Biome + TypeScript） |
| `npm run biome` | Biome 自动修复 |
| `npm test` | 运行测试 |
| `npm run test:coverage` | 测试覆盖率 |
| `npm run test:update` | 更新测试快照 |
| `npm run tsc` | 类型检查（不生成文件） |
| `npm run i18n-remove` | 移除国际化（locale=zh-CN） |
| `npm run record` | 录制登录场景请求数据 |
| `npm run openapi` | 根据 OpenAPI 生成 API 代码 |
| `npm run simple` | 精简模式（删除示例页面和多余依赖） |

> 💡 `UMI_ENV` 用于切换环境配置，对应 `config/proxy.ts` 中的不同代理规则。

> 💡 `npm run simple` 会删除示例页面（dashboard、form、list 等）和多余依赖（plots 等），替换为精简路由，适合从零开始开发。**建议先提交代码，以便需要时回退。**

**构建工具：** 本项目使用 [utoopack](https://github.com/utooland/utoo)（基于 Turbopack 的新一代打包器）作为默认构建工具，通过 `config/config.ts` 中的 `utoopack` 字段配置。utoopack 兼容 Webpack 配置格式，支持 `module.rules` 配置自定义加载器。

→ 更多内容见 [umi 入门指南](https://umijs.org/docs/guides/getting-started)、[utoo 文档](https://utoo.land)

## 路由与菜单

**路由配置** 位于 `config/routes.ts`：

```ts
// File: config/routes.ts
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
// File: config/defaultSettings.ts
export default {
  navTheme: 'light',               // 导航主题：light / dark
  colorPrimary: '#1890ff',         // 主题色
  layout: 'mix',                   // 布局模式：side / top / mix
  contentWidth: 'Fluid',           // 内容宽度：Fluid / Fixed
  fixedHeader: false,              // 固定顶部导航
  fixSiderbar: true,               // 固定侧边栏
  colorWeak: false,                // 色弱模式
  title: 'Ant Design Pro',         // 站点标题
  logo: 'https://...',             // Logo URL
  iconfontUrl: '',                 // 图标字体 URL
  token: {},                       // ProLayout token，用于细粒度样式定制
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
// File: src/models/counter.ts
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
// File: src/app.tsx
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
// File: src/app.tsx
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
// File: src/access.ts
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

→ 更多内容见 [umi 样式文档](https://umijs.org/docs/guides/styling)、[Umi Max antd 动态主题](https://umijs.org/docs/max/antd#动态切换全局配置)

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
// File: mock/user.ts
export default {
  'GET /api/currentUser': { name: 'Serati Ma', access: 'admin' },
  'POST /api/login': (req, res) => { res.end('ok'); },
};
```

Umi 自动注册 mock，开发模式下生效。

**代理配置** 位于 `config/proxy.ts`：

```ts
// File: config/proxy.ts
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

→ 更多内容见 [umi 测试](https://umijs.org/docs/guides/test)、[umi Mock](https://umijs.org/docs/guides/mock)

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
`npm run build` 生成 `dist/` 目录，部署到任意静态服务器。配置 `publicPath` 处理非根目录部署。`npm run deploy` 会自动构建并发布到 GitHub Pages（推送到 gh-pages 分支）。

**Q: 如何使用 OpenAPI 代码生成？**
1. 在 `config/config.ts` 配置 `openAPI` 2. 运行 `npm run openapi` 3. 自动生成 `src/services/` 下的代码

→ 更多内容见 [umi FAQ](https://umijs.org/docs/introduce/faq)

## 常见任务

### 添加新页面

```bash
# 1. 创建页面组件
#    文件路径：src/pages/my-page/index.tsx

# 2. 在路由配置中注册
#    文件路径：config/routes.ts
#    { path: '/my-page', name: 'myPage', icon: 'file', component: './my-page' }

# 3. 添加国际化翻译（如需菜单显示）
#    文件路径：src/locales/zh-CN/menu.ts → menu.myPage: '我的页面'
#    文件路径：src/locales/en-US/menu.ts → menu.myPage: 'My Page'
```

### 添加全局状态

```bash
# 1. 创建 model 文件（文件名即 model key）
#    文件路径：src/models/myModel.ts
#    导出自定义 Hook：export default function useMyModel() { ... }

# 2. 在组件中使用
#    import { useModel } from '@umijs/max';
#    const { data } = useModel('myModel');  // 'myModel' 对应文件名
```

### 添加 Mock 接口

```bash
# 全局 Mock：mock/api.ts（匹配所有环境）
# 页面级 Mock：src/pages/my-page/_mock.ts（Umi 自动发现）

# Mock 格式：
# export default { 'GET /api/my-data': { data: [] } }
```

### 生成 API 服务代码

```bash
# 1. 编辑 OpenAPI 配置：config/oneapi.json
# 2. 运行生成命令（覆盖 src/services/ant-design-pro/）
npm run openapi
# 3. 不要手动编辑生成代码，改 oneapi.json 重新生成
```

### 切换到精简模式

```bash
git add -A && git commit -m "chore: save before simple"  # 必须先提交
npm run simple                                              # 不可逆操作
npm install                                                 # 更新依赖
```

## 注意事项

- **`src/services/ant-design-pro/`** 为自动生成代码，禁止手动编辑。修改 `config/oneapi.json` 后执行 `npm run openapi` 重新生成
- **`npm run simple` 不可逆**：会删除示例页面和多余依赖，执行前务必提交代码
- **`.umi` 临时目录**：`src/.umi` 由 Umi 自动生成，遇到异常可删除后重启开发服务器
- **Biome 代替 ESLint**：项目使用 Biome 进行 lint 和格式化，不要安装 ESLint 或 Prettier 插件
- **Commit 规范**：必须遵循 [Conventional Commits](https://www.conventionalcommits.org/)，如 `feat:`, `fix:`, `chore:` 等
- **`npx antd lint ./src`**：提交前必须零错误零警告
- **Mock 优先级**：`mock/` 目录为全局 Mock，`src/pages/**/_mock.ts` 为页面级 Mock，两者都会被 Umi 自动注册
- **样式优先级**：Tailwind（布局）> antd-style（主题 token）> CSS Modules（组件样式）> Less（仅遗留全局样式）
- **路径别名**：`@/*` → `./src/*`，`@@/*` → `./src/.umi/*`
