# Cloudflare Worker API for preview.pro.ant.design

## Overview

Replace the dependency on `proapi.azurewebsites.net` with a self-hosted Cloudflare Worker API for the preview site.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    preview.pro.ant.design                   │
│                    (Frontend - deployed)                    │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP requests to /api/*
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              pro-api.ant-design-demo.workers.dev            │
│              (Cloudflare Worker - Hono)                     │
│                                                             │
│  Routes:                                                    │
│  • /api/login/*   - Authentication endpoints                │
│  • /api/currentUser - User info                             │
│  • /api/rule      - Table CRUD with mock data               │
│  • /api/notices   - Notifications                           │
│  • /api/fake_*    - Dashboard chart data                    │
│  • /api/tags      - Monitor tags                            │
│  • /api/users     - User list                               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

- **Framework:** Hono (Express-like routing for Cloudflare Workers)
- **Runtime:** Cloudflare Workers
- **State:** Stateless (no session persistence)

## Directory Structure

```
cloudflare-worker/
├── src/
│   ├── index.ts              # Main entry point, Hono app setup
│   ├── routes/
│   │   ├── user.ts           # /api/currentUser, /api/users, /api/login/*
│   │   ├── dashboard.ts      # /api/fake_*, /api/project/notice, /api/activities
│   │   ├── table.ts          # /api/rule (list, create, update, delete)
│   │   ├── notices.ts        # /api/notices
│   │   ├── monitor.ts        # /api/tags
│   │   └── errors.ts         # /api/500, /api/404, /api/403, /api/401
│   ├── data/
│   │   ├── user.ts           # Static user mock data
│   │   ├── dashboard.ts      # Chart data generators
│   │   ├── table.ts          # Table data generator
│   │   └── notices.ts        # Notifications data
│   └── utils/
│       └── response.ts       # JSON response helpers
├── wrangler.toml             # Cloudflare Worker config
├── package.json
└── tsconfig.json
```

## API Endpoints

| Endpoint | Method | Description | Behavior |
|----------|--------|-------------|----------|
| `/api/login/account` | POST | Login | Always returns success with `admin` role |
| `/api/login/outLogin` | POST | Logout | Returns success |
| `/api/login/captcha` | GET | Get captcha | Returns mock captcha code |
| `/api/register` | POST | Register | Returns success |
| `/api/currentUser` | GET | Current user info | Returns mock user with `admin` access |
| `/api/users` | GET | User list | Returns static user list |
| `/api/rule` | GET | Table list (paginated) | Supports `current`, `pageSize`, `name`, `sorter`, `filter` |
| `/api/rule` | POST | Table CRUD | Supports `delete`, `post`, `update` methods |
| `/api/notices` | GET | Notifications | Returns notification list |
| `/api/tags` | GET | Monitor tags | Returns mock tag data |
| `/api/project/notice` | GET | Project notices | Returns project list |
| `/api/activities` | GET | Activities | Returns activity feed |
| `/api/fake_analysis_chart_data` | GET | Analysis charts | Returns chart data |
| `/api/fake_workplace_chart_data` | GET | Workplace charts | Returns chart data |
| `/api/auth_routes` | GET | Auth routes config | Returns route permissions |
| `/api/500` | GET | Error test | Returns 500 error |
| `/api/404` | GET | Error test | Returns 404 error |
| `/api/403` | GET | Error test | Returns 403 error |
| `/api/401` | GET | Error test | Returns 401 error |

### Stateless Behavior

- Login (`POST /api/login/account`) always succeeds and returns `{ status: 'ok', currentAuthority: 'admin' }`
- No actual credential validation
- `GET /api/currentUser` always returns logged-in admin user data

## CORS Configuration

```typescript
app.use('/*', cors({
  origin: (origin) => {
    const allowedPatterns = [
      /^https:\/\/[\w-]+\.surge\.sh$/,
      /^https:\/\/[\w-]+\.pages\.dev$/,
      /^https:\/\/preview\.pro\.ant\.design$/,
      /^http:\/\/localhost:\d+$/,
    ];
    return allowedPatterns.some(pattern => pattern.test(origin));
  },
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
```

Allowed origins:
- `https://*.surge.sh` - Surge preview deployments
- `https://*.pages.dev` - Cloudflare Pages preview deployments
- `https://preview.pro.ant.design` - Production preview site
- `http://localhost:*` - Local development

## Configuration

**wrangler.toml:**
```toml
name = "pro-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "production"
```

## Deployment Steps

1. `cd cloudflare-worker && pnpm install`
2. `pnpm run dev` - Test locally at localhost:8787
3. `pnpm run deploy` - Deploy to `pro-api.ant-design-demo.workers.dev`
4. Update `src/app.tsx`:
   ```typescript
   baseURL: isDev ? '' : 'https://pro-api.ant-design-demo.workers.dev'
   ```
5. Update `config/proxy.ts` - Remove `proapi.azurewebsites.net` reference

## Changes to ant-design-pro

1. **src/app.tsx** - Update production baseURL
2. **config/proxy.ts** - Remove Azure proxy configuration