# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ant Design Pro — an enterprise-class React UI solution built on Umi Max (v4), antd v6, and ProComponents v3. It serves as both a production boilerplate and a live demo of Ant Design's capabilities.

## Commands

```bash
# Development
npm start              # Dev server with mock (UMI_ENV=dev)
npm run dev            # Dev server without mock
npm run start:no-mock  # Start with MOCK=none, proxy to real backend
npm run start:pre      # Pre-production environment
npm run start:test     # Test environment

# Build & Preview
npm run build          # Production build (utoopack, Turbopack-based)
npm run preview        # Preview production build on port 8000
npm run preview:build  # Build and preview on port 8000
npm run deploy         # Build and deploy to GitHub Pages (gh-pages branch)
npm run analyze        # Bundle size analysis

# Lint & Type Check
npm run lint           # Biome lint + tsc --noEmit
npm run biome          # Biome check --write (auto-fix)
npm run tsc            # Type check only (tsc --noEmit)

# Test
npm run test              # Run all Jest tests
npm run test:coverage     # Jest with coverage
npm run test:update       # Update test snapshots
# Run a single test: npx jest src/pages/user/login/login.test.tsx

# Code Generation
npm run openapi    # Regenerate services from config/oneapi.json (overwrites src/services/)

# Other
npm run simple     # Irreversible: removes most page blocks for minimal version
npm run i18n-remove # Remove i18n, replace with zh-CN
npm run record     # Record request data for mock replay
```

## Documentation

- `docs/cheatsheet.zh-CN.md` / `docs/cheatsheet.en-US.md` — comprehensive cheatsheet covering routes, layout, data flow, requests, permissions, i18n, styling, and testing with code examples. Rendered in the Welcome page via `@ant-design/x-markdown`.

## Architecture

### Framework: Umi Max

Umi Max (`@umijs/max`) is the meta-framework. It wraps the build pipeline and provides conventions:

- **Build tool**: utoopack (Turbopack-based, Webpack-compatible). Configured via `utoopack` field in `config/config.ts`, supports `module.rules` for custom loaders
- **Central config**: `config/config.ts` (defineConfig) controls all plugins, theme, proxy, and build settings
- **Routes**: Defined declaratively in `config/routes.ts`, not convention-based. Each route maps `component` to a file under `src/pages/`. Route `name` auto-maps to `menu.xxx` i18n key. Route `access` field controls menu visibility (unauthorized routes hidden from menu)
- **Convention files in `src/`**: `app.tsx` (runtime config), `access.ts` (permissions), `global.tsx` (side effects), `loading.tsx` (route transitions), `typings.d.ts` (global types)
- **Umi plugins** are enabled via config flags in `config/config.ts` (e.g., `model`, `initialState`, `access`, `locale`, `qiankun`)

### Authentication Flow

1. `app.tsx` exports `getInitialState()` → calls `GET /api/currentUser`
2. If 401 and not on login page → redirect to `/user/login?redirect=...`
3. `access.ts` defines permissions: `canAdmin` = `currentUser.access === 'admin'`
4. Routes use `access: 'canAdmin'` in `config/routes.ts` for permission gating
5. Login mock credentials: `admin`/`ant.design` (admin) or `user`/`ant.design` (user)

### API & Request Layer

- **Auto-generated services** in `src/services/ant-design-pro/` — do NOT edit manually; regenerate with `npm run openapi`
- **Per-page services**: many pages have co-located `service.ts` files
- **Request config**: centralized in `src/requestErrorConfig.ts` (error handler, interceptors, base URL). The `request` export in `app.tsx` sets global `RequestConfig`
- Built-in `request` function from `@umijs/max` — no manual axios wrapping needed
- Production API: `https://pro-api.ant-design-demo.workers.dev`
- Dev proxy config: `config/proxy.ts` (keyed by `UMI_ENV`)

### Mock System

- Global mocks in `mock/` (Express-style handlers matching URL patterns like `'GET /api/currentUser'`)
- Co-located page mocks: `src/pages/**/_mock.ts` (Umi auto-discovers these)
- `requestRecord.mock.js` is gitignored

### State Management

- **Umi model plugin** (`useModel`): files in `src/models/` auto-register as global hooks. Use `useModel('filename')` in any component
- **`useModel('@@initialState')`** for global state (currentUser, settings). Initialized by `getInitialState()` in `app.tsx` which runs once on app startup
- **`useRequest`** from `@umijs/max` for simple data fetching
- **@tanstack/react-query** for complex server state (e.g., table-list uses `useMutation` + `useQuery`)
- Most pages use ProTable's built-in `request` prop for data loading

### Styling: Three Systems Coexist

1. **Tailwind CSS v4** — entry: `src/tailwind.css`, PostCSS plugin in `postcss.config.js`. Best for layout utilities
2. **antd-style v4** (`createStyles`) — CSS-in-JS with design token access (`{ token }`). Preferred when consuming theme tokens
3. **CSS Modules** (`*.module.less` / `*.module.css`) — for component-scoped styles
4. **Less** (`global.less`) — legacy, only for font-face declarations and base styles

New code should prefer Tailwind for layout, antd-style for theme-aware styles, CSS Modules for component styles. Less is only for legacy global styles.

Dynamic theme: configured in `config/config.ts` under `antd.configProvider.theme.token`. Dev mode `SettingDrawer` allows live theme switching.

### Internationalization

8 locales in `src/locales/` (zh-CN, en-US, zh-TW, ja-JP, pt-BR, id-ID, fa-IR, bn-BD). Pages use `useIntl().formatMessage()` with `id` and `defaultMessage`. Menu labels auto-resolve via route `name` key (e.g., `name: 'login'` → `menu.login`).

### Layout

ProLayout is configured via the `layout` export in `src/app.tsx` (`RunTimeLayoutConfig`). Layout settings (theme, color, layout mode) in `config/defaultSettings.ts`. Layout modes: `side` (sidebar), `top` (top nav), `mix` (mixed). Routes with `layout: false` (e.g., `/user/*`) render without the ProLayout shell. Use `<PageContainer>` from `@ant-design/pro-components` for page-level headers and breadcrumbs.

### Page Co-location Pattern

Each page directory contains its own index.tsx, optional service.ts, _mock.ts, data.d.ts (types), and style.ts or CSS files. This is the primary organizational pattern — keep page-specific code with the page.

### Cloudflare Worker Backend

`cloudflare-worker/` is a separate deployable (Hono framework, own `package.json`/`tsconfig.json`). Not an npm workspace — manage independently. Provides the production demo API.

## Ant Design CLI

`@ant-design/cli` (antd) is installed as a dev dependency. It provides offline antd component metadata and project analysis. Run via `npx antd`.

- **Always query before writing antd code** — use `npx antd info <Component>` to check props/APIs rather than guessing from memory
- `npx antd demo <Component> <name>` — get working demo code
- `npx antd token <Component>` — check design tokens
- `npx antd semantic <Component>` — check semantic classNames
- `npx antd lint ./src` — find deprecated or problematic antd usage. **Must pass with zero errors and warnings before committing**
- `npx antd doctor` — diagnose project configuration issues
- `npx antd migrate <v1> <v2>` — migration checklist between versions
- Always use `--format json` for structured output

The CLI also supports MCP server mode: `npx antd mcp` (for IDE integrations).

## Key Conventions

- **Biome** replaces ESLint + Prettier. Config in `biome.json`. Pre-commit hook runs `lint-staged` with Biome.
- **Commit messages**: must follow conventional commits (`commitlint` with `@commitlint/config-conventional`).
- **TypeScript strict mode** enabled. Path aliases: `@/*` → `./src/*`, `@@/*` → `./src/.umi/*`.
- **Node >= 20** required.
- **Markdown as raw strings**: `config/md-raw-loader.cjs` lets `.md` files be imported as strings (used in Welcome/cheatsheet pages with `@ant-design/x-markdown`).
- **Auto-generated code in `src/services/`** is excluded from Biome linting. Never edit manually — regenerate with `npm run openapi`.
- **Adding a new page**: 1) Create component in `src/pages/` 2) Add route in `config/routes.ts` 3) Add menu translation in `src/locales/` (route `name` maps to `menu.xxx` i18n key)
- **Adding global state**: Create a file in `src/models/` exporting a custom Hook, use `useModel('filename')` in components
- **Access control**: Route-level via `access` field in routes; component-level via `<Access accessible={...}>` or `useAccess()` hook from `@umijs/max`