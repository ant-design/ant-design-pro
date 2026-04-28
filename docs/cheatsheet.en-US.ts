const content = `# Ant Design Pro Cheatsheet

![Ant Design Pro](https://mdn.alipayobjects.com/huamei_fkc4p0/afts/img/A*EX3ISYC2ghEAAAAAddAAAAgAeobDAQ/original)

## Getting Started

**Requirements:** Node.js >= 20

**Create a project:**

\`\`\`bash
git clone --depth 1 https://github.com/ant-design/ant-design-pro.git my-project
cd my-project
npm install
\`\`\`

The project offers two modes:

- **Full mode**: Includes all demo pages (Dashboard, Forms, Lists, Access, etc.), great for reference and learning
- **Simple mode**: Only keeps login page and basic layout, ideal for starting from scratch

Switch to simple mode:

\`\`\`bash
git add -A && git commit -m "chore: save before simple"  # Commit first to allow revert
npm run simple                                             # Remove demo pages and unused deps
npm install                                                # Update dependencies
\`\`\`

> 💡 Start with full mode to learn the project structure, then switch to simple mode for development.

**Directory structure:**

\`\`\`
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
\`\`\`

**Common commands:**

| Command | Description |
|---------|-------------|
| \`npm start\` | Start dev server (UMI_ENV=dev, with Mock) |
| \`npm run dev\` | Start dev server (no Mock) |
| \`npm run start:dev\` | Same as dev, UMI_ENV=dev, no Mock |
| \`npm run start:no-mock\` | Start without Mock |
| \`npm run start:pre\` | Pre-production environment |
| \`npm run start:test\` | Test environment |
| \`npm run build\` | Build for production |
| \`npm run preview\` | Build and preview locally (port 8000) |
| \`npm run analyze\` | Analyze bundle size |
| \`npm run lint\` | Lint (Biome + TypeScript) |
| \`npm run biome\` | Auto-fix with Biome |
| \`npm test\` | Run tests |
| \`npm run test:coverage\` | Test with coverage |
| \`npm run openapi\` | Generate API code from OpenAPI schema |
| \`npm run simple\` | Strip demo pages and unused deps |

> 💡 \`UMI_ENV\` switches environment configs, mapping to different proxy rules in \`config/proxy.ts\`.

> 💡 \`npm run simple\` removes demo pages (dashboard, form, list etc.) and unused dependencies (plots, etc.), replacing with minimal routes. Ideal for starting from scratch. **Commit your code first so you can revert if needed.**

**Build tool:** This project uses [utoopack](https://github.com/utooland/utoo) (a next-gen bundler powered by Turbopack) as the default build tool, configured via the \`utoopack\` field in \`config/config.ts\`. utoopack is Webpack-compatible and supports \`module.rules\` for custom loaders.

→ See [umi Getting Started](https://umijs.org/docs/guides/getting-started), [utoo Docs](https://utoo.land)

## Routes & Menu

**Route config** is in \`config/routes.ts\`:

\`\`\`ts
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
\`\`\`

**Route navigation:**

\`\`\`tsx
import { useNavigate, useParams, useLocation } from '@umijs/max';

const navigate = useNavigate();
navigate('/dashboard');        // navigate
navigate(-1);                  // go back

const { id } = useParams();   // dynamic param /user/:id
const location = useLocation(); // current route info
\`\`\`

**Menu & access:** The \`access\` field in route config controls menu visibility — unauthorized routes won't appear in the menu.

> 💡 The \`name\` field is automatically mapped to \`menu.xxx\` i18n keys. Configure translations in \`src/locales/\`.

→ See [umi Routes](https://umijs.org/docs/guides/routes), [Umi Max Layout & Menu](https://umijs.org/docs/max/layout-menu)

## Layout

**ProLayout config** is in \`config/defaultSettings.ts\`:

\`\`\`ts
export default {
  navTheme: 'light',        // nav theme: light / dark
  colorPrimary: '#1890ff',  // primary color
  layout: 'mix',            // layout mode: side / top / mix
  contentWidth: 'Fluid',    // content width: Fluid / Fixed
  fixSiderbar: true,        // fixed sidebar
};
\`\`\`

**Layout modes:**
- \`side\` — Side navigation
- \`top\` — Top navigation
- \`mix\` — Top + side mixed navigation

**Page container:**

\`\`\`tsx
import { PageContainer } from '@ant-design/pro-components';

const Page = () => (
  <PageContainer
    header={{ title: 'Page Title' }}
    content="Page description"
  >
    {/* Page content */}
  </PageContainer>
);
\`\`\`

**Custom areas:** Top-right \`src/components/RightContent\`, footer \`src/components/Footer\`.

→ See [Umi Max Layout & Menu](https://umijs.org/docs/max/layout-menu)

## Data Flow

**useModel — lightweight global state:** Create a file in \`src/models/\` to auto-register:

\`\`\`ts
// src/models/counter.ts
import { useState } from 'react';

export default function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
\`\`\`

\`\`\`tsx
// Use in any component
import { useModel } from '@umijs/max';

const { count, increment } = useModel('counter');
\`\`\`

**useRequest — data fetching:**

\`\`\`tsx
import { useRequest } from '@umijs/max';

const { data, loading, error } = useRequest(getUserInfo);
\`\`\`

**React Query — server state management:**

\`\`\`tsx
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
\`\`\`

**Initial state — getInitialState:** Define in \`src/app.tsx\`, accessible globally:

\`\`\`tsx
// src/app.tsx
export async function getInitialState() {
  const currentUser = await fetchUserInfo();
  return { currentUser };
}

// Use in components
import { useModel } from '@umijs/max';
const { initialState } = useModel('@@initialState');
\`\`\`

> 💡 \`getInitialState\` runs once on app startup, ideal for fetching global info (user identity, permissions).

→ See [Umi Max Data Flow](https://umijs.org/docs/max/data-flow)

## Request

**Request config** is in \`src/app.tsx\`:

\`\`\`ts
export const request: RequestConfig = {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  requestInterceptors: [],   // request interceptors
  responseInterceptors: [],  // response interceptors
};
\`\`\`

**Error handling** is in \`src/requestErrorConfig.ts\`, customize error code mapping and notification logic.

**Using request:**

\`\`\`tsx
import { request } from '@umijs/max';

// GET
const data = await request('/api/users', { params: { page: 1 } });

// POST
await request('/api/users', { method: 'POST', data: { name: 'test' } });
\`\`\`

**OpenAPI code generation:**

\`\`\`bash
npm run openapi
\`\`\`

Auto-generates API calling code under \`src/services/\` based on \`config/openapi.json\`.

> 💡 Generated code uses \`import { request } from '@umijs/max'\` directly — no manual wrapping needed.

→ See [Umi Max Request](https://umijs.org/docs/max/request)

## Access Control

**Define permissions** in \`src/access.ts\`:

\`\`\`ts
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    canAdmin: currentUser?.access === 'admin',
    canUser: !!currentUser,
  };
}
\`\`\`

**Route-level access:** Add \`access\` field in route config:

\`\`\`ts
{ path: '/admin', access: 'canAdmin' }
\`\`\`

**Component-level access:**

\`\`\`tsx
import { Access, useAccess } from '@umijs/max';

// Declarative
<Access accessible={access.canAdmin}>
  <AdminPanel />
</Access>

// Imperative
const access = useAccess();
if (access.canAdmin) { /* ... */ }
\`\`\`

→ See [Umi Max Access](https://umijs.org/docs/max/access)

## Internationalization

**Config** in \`config/config.ts\`:

\`\`\`ts
locale: {
  default: 'zh-CN',
  antd: true,         // sync antd component locale
  baseNavigator: true, // follow browser language
},
\`\`\`

**File structure:**

\`\`\`
src/locales/
├── zh-CN.ts        # Chinese entry
├── zh-CN/
│   ├── menu.ts     # Menu translations
│   ├── pages.ts    # Page translations
│   └── ...
├── en-US.ts        # English entry
└── en-US/
    └── ...
\`\`\`

**Usage:**

\`\`\`tsx
import { useIntl, FormattedMessage } from '@umijs/max';

// Hook
const intl = useIntl();
intl.formatMessage({ id: 'menu.welcome' });

// Component
<FormattedMessage id="menu.welcome" />
\`\`\`

**Switch locale:**

\`\`\`tsx
import { setLocale } from '@umijs/max';
setLocale('en-US', false);  // false = no page reload
\`\`\`

→ See [Umi Max i18n](https://umijs.org/docs/max/i18n)

## Styling

**CSS Modules:** Name files \`*.module.less\` or \`*.module.css\`:

\`\`\`css
/* example.module.less */
.container { padding: 24px; }
.title { font-size: 16px; }
\`\`\`

\`\`\`tsx
import styles from './example.module.less';
<div className={styles.container} />
\`\`\`

**antd-style (CSS-in-JS):**

\`\`\`tsx
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  card: css\`
    background: \${token.colorBgContainer};
    border-radius: \${token.borderRadiusLG}px;
  \`,
}));

const { styles } = useStyles();
<div className={styles.card} />
\`\`\`

**Tailwind CSS (v4):** Use directly in className:

\`\`\`tsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-[#141414]" />
\`\`\`

**Dynamic theme:** Set in \`config/config.ts\` \`antd\` config:

\`\`\`ts
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
\`\`\`

Use SettingDrawer in dev mode to switch themes in real-time.

> 💡 Three styling approaches can coexist: Tailwind for layout, CSS Modules for component styles, antd-style when consuming theme tokens.

→ See [umi Styling](https://umijs.org/docs/guides/styling), [Umi Max antd Dynamic Theme](https://umijs.org/docs/max/antd#动态主题)

## Testing & Debugging

**Jest testing:**

\`\`\`bash
npm test                    # Run all tests
npm run test:coverage       # With coverage report
npm run test:update         # Update snapshots
\`\`\`

Test files go next to the component, named \`*.test.ts(x)\`.

**Mock data:** Create files in \`mock/\`:

\`\`\`ts
// mock/user.ts
export default {
  'GET /api/currentUser': { name: 'Serati Ma', access: 'admin' },
  'POST /api/login': (req, res) => { res.end('ok'); },
};
\`\`\`

Umi auto-registers mocks, active in dev mode.

**Proxy config** is in \`config/proxy.ts\`:

\`\`\`ts
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
};
\`\`\`

> 💡 Use \`MOCK=none\` to skip mock and proxy to backend: \`npm run start:no-mock\`.

→ See [umi Testing](https://umijs.org/docs/guides/testing), [umi Mock](https://umijs.org/docs/guides/mock)

## FAQ

**Q: How to disable Mock?**
\`npm run start:no-mock\` or \`cross-env MOCK=none max dev\`

**Q: How to change the primary color?**
Edit \`colorPrimary\` in \`config/defaultSettings.ts\`. Use SettingDrawer for live preview in dev mode.

**Q: How to add a new page?**
1. Create component in \`src/pages/\` 2. Add route in \`config/routes.ts\` 3. Add menu translation in \`src/locales/\` (if needed)

**Q: How to add global state?**
Create a file in \`src/models/\` exporting a custom Hook, then use \`useModel('filename')\` in components.

**Q: How to deploy?**
\`npm run build\` generates \`dist/\`. Deploy to any static file server. Set \`publicPath\` for non-root deployments.

**Q: How to use OpenAPI code generation?**
1. Configure \`openAPI\` in \`config/config.ts\` 2. Run \`npm run openapi\` 3. Code is auto-generated under \`src/services/\`

→ See [umi FAQ](https://umijs.org/docs/guides/faq)`;

export default content;
