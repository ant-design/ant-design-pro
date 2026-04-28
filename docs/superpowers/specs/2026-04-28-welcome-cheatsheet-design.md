# Ant Design Pro Welcome Cheatsheet 设计文档

## 背景

原 pro.ant.design 文档站有 33 篇文档，分散在多个分组中。现需要用一页 Markdown 文档替代，放在 Welcome 页面，以 cheatsheet 风格覆盖大多数开发需求。

## 目标读者

兼顾两类读者：
- 刚接触 Ant Design Pro 的开发者（需要入门指导）
- 有 React 经验但没用过 Pro 的开发者（需要快速查阅 Pro 特性）

## 核心原则

1. **Cheatsheet 风格**：一句话说明 + 关键代码片段 + 要点提示，不说废话
2. **一页满足大多数需求**：每个主题只给最常用模式，不展开所有细节
3. **外链补充**：章节末尾链接到 umi / umi max 官方文档，供深入阅读
4. **不展示 src/pages 内容**：文档中不涉及页面示例代码

## 文档章节结构

```
# Ant Design Pro Cheatsheet

## 快速开始
  - 环境要求 (Node >= 20)
  - 创建项目 & 安装依赖
  - 目录结构（精简版，不列 src/pages）
  - package.json scripts 常用命令:
    - `npm start` / `npm run dev` — 本地开发 (dev 区分有无 Mock / 不同环境)
    - `npm run build` / `npm run preview` — 构建与本地预览
    - `npm run lint` / `npm run biome` — 代码检查
    - `npm test` / `npm run test:coverage` — 测试
    - `npm run openapi` — OpenAPI 代码生成
    - `npm run simple` — 精简模式启动
    - `npm run analyze` — 构建产物分析
  → 外链: umi 入门指南

## 路由与菜单
  - config/routes.ts 配置结构
  - 路由参数: useParams, useNavigate
  - 菜单与权限联动: access 属性
  - 路由重定向 & 404
  → 外链: umi 路由文档、umi max 布局与菜单

## 布局
  - ProLayout 配置 (defaultSettings.ts)
  - 布局模式: side / top / mix
  - PageContainer 页面容器
  - 自定义 Footer / RightContent
  → 外链: umi max 布局与菜单

## 数据流
  - useModel 全局状态: src/models/ 约定
  - useRequest 数据请求
  - React Query: useQuery / useMutation (@tanstack/react-query)
  - 初始状态: getInitialState (app.tsx)
  → 外链: umi max 数据流

## 请求
  - request 配置 (app.tsx)
  - 请求/响应拦截器
  - 错误处理 (requestErrorConfig.ts)
  - OpenAPI 代码生成 (@umijs/max-plugin-openapi)
  → 外链: umi max 请求

## 权限
  - access.ts 定义权限
  - 路由级权限: access 属性
  - 组件级权限: useAccess hook & Access 组件
  → 外链: umi max 权限

## 国际化
  - locale 插件配置 (config.ts)
  - src/locales/ 文件结构
  - useIntl & formatMessage 用法
  → 外链: umi max 国际化

## 样式
  - CSS Modules (.module.less / .module.css)
  - antd-style (CSS-in-JS, createStyles)
  - Tailwind CSS (Tailwind v4)
  - 动态主题 (antd config)
  → 外链: umi 样式文档、umi max antd 动态主题

## 测试 & 调试
  - Jest 单元测试
  - Mock 数据 (mock/ 目录约定)
  - Proxy 代理配置 (config/proxy.ts)
  → 外链: umi 测试、umi Mock

## FAQ
  - 常见问题速查
  → 外链: umi FAQ
```

## 风格约定

- **不说废话**：每个条目一句话说清做什么，然后直接给代码
- **代码即文档**：典型用法用代码片段展示，不过度解释
- **要点提示**：重要的注意事项、常见坑用 `> 💡` blockquote 突出
- **外链格式**：章节末尾用 `→ 更多内容见 [文档名](url)` 统一格式

## 外链对照表

| 章节 | 外链 |
|------|------|
| 快速开始 | https://umijs.org/docs/guides/getting-started |
| 路由与菜单 | https://umijs.org/docs/guides/routes, https://umijs.org/docs/max/layout-menu |
| 布局 | https://umijs.org/docs/max/layout-menu |
| 数据流 | https://umijs.org/docs/max/data-flow |
| 请求 | https://umijs.org/docs/max/request |
| 权限 | https://umijs.org/docs/max/access |
| 国际化 | https://umijs.org/docs/max/i18n |
| 样式 | https://umijs.org/docs/guides/styling, https://umijs.org/docs/max/antd#动态主题 |
| 测试 & 调试 | https://umijs.org/docs/guides/testing, https://umijs.org/docs/guides/mock |
| FAQ | https://umijs.org/docs/guides/faq |

## 文件结构

```
docs/
├── welcome.zh-CN.md    # 中文版 cheatsheet Markdown 源文件
└── welcome.en-US.md    # 英文版 cheatsheet Markdown 源文件
```

## 页面布局

Welcome 页面采用左右双栏布局（可基于 antd Row/Col 或 Flex 实现）：

```
┌─────────────────────────────────────────────────────┐
│ PageContainer                                        │
├──────────────────────────┬──────────────────────────┤
│                          │  📦 了解 umi              │
│                          │  umi 是... →             │
│   Markdown Cheatsheet    ├──────────────────────────┤
│   (文档卡片)              │  📦 了解 Ant Design       │
│                          │  Ant Design 是... →      │
│   @ant-design/x-markdown ├──────────────────────────┤
│   渲染 docs/welcome.xxx  │  📦 了解 Pro Components   │
│                          │  ProComponents 是... →   │
│                          │                          │
├──────────────────────────┴──────────────────────────┤
└─────────────────────────────────────────────────────┘
```

- **左侧（主区域，约 2/3 宽度）**：Markdown cheatsheet 文档，用 `@ant-design/x-markdown` 渲染，包裹在 Card 组件中
- **右侧（约 1/3 宽度）**：三个信息卡片，沿用原 Welcome 页面的 InfoCard 组件，分别链接到 umi 文档、Ant Design 官网、ProComponents 文档

## 实现方式

1. Markdown 源文件放在 `docs/` 目录
2. Welcome 组件 (`src/pages/Welcome.tsx`) 读取当前 locale，动态 import 对应的 `.md` 文件
3. 使用 `@ant-design/x-markdown` 渲染 Markdown 内容，包裹在 Card 中
4. 保留原 InfoCard 组件，渲染右侧三个链接卡片
5. i18n 切换：通过 umi 的 `useIntl()` 获取当前语言，自动加载对应的 Markdown 文件
6. 路由配置：`/welcome` 保持现有路由，但使其成为默认着陆页（或保持 `/` 重定向到 dashboard 不变，由用户决定）

## 影响范围

- 新增：`docs/welcome.zh-CN.md`、`docs/welcome.en-US.md`
- 修改：`src/pages/Welcome.tsx`（替换为 Markdown 渲染逻辑）
- 可能修改：`config/routes.ts`（如需调整默认路由）
- 不涉及：`src/pages/` 下其他页面内容