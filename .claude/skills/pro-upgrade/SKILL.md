---
name: pro-upgrade
description: >
  Use when the user wants to upgrade their Ant Design Pro project to the latest version.
  Triggers on: upgrade pro, pro upgrade, migrate pro, update pro, 升级, 迁移项目,
  "how to upgrade", "update to latest", "keep project up to date".
allowed-tools:
  - Bash(git clone *)
  - Bash(diff *)
  - Bash(npm install)
  - Bash(npm run lint*)
  - Bash(npm run build*)
  - Bash(npm run tsc*)
  - Bash(npx antd *)
  - Bash(rm -rf /tmp/ant-design-pro-upgrade*)
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# Ant Design Pro Upgrade Skill

You are an Ant Design Pro upgrade assistant. Your task is to help users upgrade their Pro-based project to the latest version by comparing it against the official template and intelligently merging changes.

## Preflight

Before starting, confirm:

1. The user has committed or stashed all changes (`git status` should be clean or they confirm it's OK to proceed).
2. If not clean, remind them to commit or stash their changes first (e.g., "Please commit or stash your changes — the upgrade process will modify multiple files.") and wait for them to confirm.

## Upgrade Flow

### Step 1 — Fetch the latest template

```bash
rm -rf /tmp/ant-design-pro-upgrade
git clone --depth=1 https://github.com/ant-design/ant-design-pro.git /tmp/ant-design-pro-upgrade
```

Read the template's `package.json` to confirm its version.

### Step 2 — Classify files

Separate the user's project files into **framework files** (Pro-owned, rarely customized) and **business files** (user-written, must be preserved).

**Framework files** — diff these against the template:

| Path | Notes |
|---|---|
| `package.json` | dependencies, scripts, devDependencies only |
| `config/config.ts` | framework config |
| `config/routes.ts` | structure only — preserve user-added routes |
| `config/defaultSettings.ts` | layout/theme defaults |
| `config/proxy.ts` | structure only — preserve user targets |
| `src/app.tsx` | runtime config |
| `src/access.ts` | permission definitions |
| `src/global.tsx` | global side effects |
| `src/loading.tsx` | loading component |
| `src/requestErrorConfig.ts` | request interceptor |
| `src/typings.d.ts` | global type declarations |
| `tsconfig.json` | TypeScript config |
| `biome.json` or `biome.jsonc` | linter config |
| `.husky/` | git hooks |
| `commitlint.config.*` | commit lint config |
| `src/services/ant-design-pro/` | auto-generated — do NOT manually edit; regenerate with `npm run openapi` |

**Business files** — preserve these, only adjust imports/APIs if needed:

- `src/pages/**` — user pages
- `src/components/**` — user components
- `src/models/**` — user models
- `src/services/**/*.ts` — custom service files (NOT the `ant-design-pro/` subdirectory)
- `src/locales/**` — user translations (framework keys may need updating)
- `src/utils/**` — user utilities
- `mock/**` — user mocks
- Any other files not listed above

### Step 3 — Diff framework files

For each framework file, read both the user's version and the template version. Identify:

- **New dependencies** or version bumps in `package.json`
- **New/changed config options** in `config/` files
- **Import path changes** (e.g., `from 'umi'` → `from '@umijs/max'`)
- **API changes** in `src/app.tsx`, `src/access.ts`, etc.
- **New files** that exist in template but not in user's project

### Step 4 — Merge intelligently

Apply changes with these rules:

**Framework files — adopt template structure, preserve user customizations:**
- `package.json`: update dependency versions to match template. Keep any extra deps the user added. If a dependency exists in the user's project but not in the template, assume it is a user customization and preserve it.
- `config/routes.ts`: adopt the template's route structure for framework pages, but keep all user-added routes intact.
- `config/proxy.ts`: adopt structure, preserve user's proxy targets.
- Other framework files: adopt the template version, preserving any user customizations that are clearly intentional (comments, extra exports, business logic mixed in).

**Business files — minimal changes only:**
- Update import paths if framework modules moved (e.g., `'umi'` → `'@umijs/max'`).
- Update deprecated API calls if the template shows a new pattern.
- Never rewrite business logic, restructure components, or change styling approaches unless the old approach is broken.

**Auto-generated files:**
- `src/services/ant-design-pro/`: do NOT edit. Tell the user to run `npm run openapi` after upgrade.

### Step 5 — Antd-specific migration checks

Run these commands to catch antd API changes:

```bash
npx antd env --format json
npx antd lint ./src --format json --only deprecated
```

If the user is upgrading across major antd versions, also run:

```bash
npx antd migrate <current_major> <target_major> --format json
```

Detect the current major version from the user's `package.json` and the target from the template's.

Address any findings by updating the flagged code.

### Step 6 — Install and verify

```bash
npm install
npm run lint
npm run build
```

Fix any errors. Common post-upgrade issues:
- Type errors from changed APIs → check `npx antd info <Component>` for current APIs
- New lint rules from Biome config changes → run `npm run biome` to auto-fix
- Missing peer dependencies → check `npm install` warnings

### Step 7 — Cleanup and summarize

```bash
rm -rf /tmp/ant-design-pro-upgrade
```

Output a summary of all changes made, grouped by category:

1. **Dependencies updated** — list version changes
2. **Config changes** — what changed in config files
3. **Code patterns migrated** — import path changes, API updates
4. **New files added** — any files from the template that didn't exist before
5. **Manual review needed** — anything you're unsure about or that requires user action

Remind the user to:
- Run `npm run openapi` if they use the auto-generated API services
- Test their application thoroughly
- Commit the changes

## Key Principles

- **No hardcoded versions** — this skill works regardless of the version gap between the user's project and the latest template.
- **Preserve business code** — only modify what's necessary for framework compatibility.
- **Conservative merging** — when uncertain whether a change is a user customization or an outdated pattern, ask the user instead of guessing.
- **Leverage `@ant-design/cli`** — use `antd migrate`, `antd lint`, `antd info` for antd-specific checks; don't guess APIs from memory.
- **Clean up** — always remove the temporary clone directory.