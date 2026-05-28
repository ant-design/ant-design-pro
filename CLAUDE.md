# CLAUDE.md

## Project

Ant Design Pro — React enterprise boilerplate on Umi Max v4, antd v6, ProComponents v3.

## Commands

`npm start` (dev+mock), `npm run dev` (no mock), `npm run build` (utoopack), `npm run lint` (Biome+tsc), `npm run test` (Jest), `npx antd lint ./src` (antd-specific checks).

Other: `npm run openapi` (regenerate `src/services/`), `npm run simple` (**irreversible** — commit first), `npm run biome` (auto-fix), `npm run tsc` (type-check only).

## Critical Rules

- **Never edit `src/services/ant-design-pro/`** — auto-generated, regenerate with `npm run openapi`
- **Biome only** — no ESLint, no Prettier. Both `npm run lint` and `npx antd lint ./src` must pass before commit
- **Always `npx antd info <Component>` before writing antd code** — don't guess APIs from memory
- **`npm run simple` is irreversible** — always commit/branch first
- **Conventional commits** required (commitlint enforced)
- **TypeScript strict** · **Node ≥ 20** · **`package-lock.json`** (not yarn/pnpm)
- **`.umi` dir is auto-generated** — delete `src/.umi` and restart if dev server acts up

## Architecture Essentials

**Config**: `config/config.ts` (defineConfig), `config/routes.ts` (declarative routes). Route `name` → `menu.xxx` i18n key; `access` field gates visibility.

**Convention files** (`src/`): `app.tsx` (runtime config + `getInitialState`), `access.ts` (permissions), `global.tsx` (side effects), `loading.tsx`, `typings.d.ts`.

**Auth**: `getInitialState()` → `GET /api/currentUser`; 401 → redirect login. `access.ts`: `canAdmin = currentUser.access === 'admin'`. Mock creds: `admin`/`ant.design` or `user`/`ant.design`.

**State**: `useModel('filename')` for global hooks (`src/models/`). `useModel('@@initialState')` for currentUser/settings. ProTable `request` prop for most data loading. `@tanstack/react-query` for complex server state.

**Styling priority**: Tailwind CSS v4 (layout) → antd-style v4 / `createStyles` (theme tokens) → CSS Modules → Less (legacy only).

**Request**: built-in `request` from `@umijs/max`, configured in `src/requestErrorConfig.ts`. Per-page `service.ts` for non-generated APIs.

**i18n**: 8 locales in `src/locales/`. `useIntl().formatMessage({ id, defaultMessage })`.

**Mock**: `mock/` (global) + `src/pages/**/_mock.ts` (co-located). Express-style handlers.

**Cloudflare Worker**: `cloudflare-worker/` — separate Hono app, own `package.json`, not an npm workspace.

## AI Skills

Install skills: `npx skills add ant-design/ant-design-pro`

**`/pro-upgrade`** — Auto-upgrade the project to the latest Ant Design Pro version. Diffs the latest template against this project, merges framework changes while preserving business code. Works for any version gap (v5→v6, v6.x→latest, etc.). Commit before running.

**`/antd`** — Ant Design expert assistant powered by `@ant-design/cli` (offline metadata for v3–v6). Use it to look up component APIs (`npx antd info`), grab working demos (`npx antd demo`), lint deprecated usage (`npx antd lint`), get migration checklists (`npx antd migrate`), check changelogs, and report bugs. Always query before writing antd code.

> For non-Claude AI assistants, paste `.claude/skills/pro-upgrade/SKILL.md` or `.claude/skills/antd/SKILL.md` to them.

## Page Co-location

Each page dir: `index.tsx`, optional `service.ts`, `_mock.ts`, `data.d.ts`, style files. Keep page-specific code with the page.