# Cloudflare Worker API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a stateless Cloudflare Worker API using Hono to replace proapi.azurewebsites.net for preview.pro.ant.design

**Architecture:** Hono framework on Cloudflare Workers, stateless API with CORS support for surge.sh, pages.dev, localhost, and preview.pro.ant.design. Routes organized by domain (user, dashboard, table, notices, monitor, errors).

**Tech Stack:** Hono, Cloudflare Workers, TypeScript, Wrangler

---

## File Map

### New Files (cloudflare-worker/)
```
cloudflare-worker/
├── src/
│   ├── index.ts              # Hono app entry, CORS middleware
│   ├── routes/
│   │   ├── user.ts           # Login, currentUser, users, captcha, register
│   │   ├── dashboard.ts      # Chart data, project notice, activities
│   │   ├── table.ts          # Table CRUD with pagination/filtering
│   │   ├── notices.ts        # Notifications
│   │   ├── monitor.ts        # Tags
│   │   └── errors.ts         # Error test endpoints
│   ├── data/
│   │   ├── user.ts           # User mock data
│   │   ├── dashboard.ts      # Chart data generators
│   │   ├── table.ts          # Table data generator
│   │   └── notices.ts        # Notifications data
│   └── utils/
│       └── cors.ts           # CORS origin validation
├── wrangler.toml
├── package.json
└── tsconfig.json
```

### Modified Files (ant-design-pro)
```
src/app.tsx:153          # Update baseURL
config/proxy.ts:28-35    # Remove Azure proxy
```

---

## Task 1: Initialize Cloudflare Worker Project

**Files:**
- Create: `cloudflare-worker/package.json`
- Create: `cloudflare-worker/tsconfig.json`
- Create: `cloudflare-worker/wrangler.toml`

- [ ] **Step 1: Create cloudflare-worker directory and package.json**

```bash
mkdir -p cloudflare-worker/src/routes cloudflare-worker/src/data cloudflare-worker/src/utils
```

Create `cloudflare-worker/package.json`:
```json
{
  "name": "pro-api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "hono": "^4.6.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20241127.0",
    "typescript": "^5.7.2",
    "wrangler": "^3.91.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `cloudflare-worker/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "skipLibCheck": true,
    "lib": ["ES2021"],
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Create wrangler.toml**

Create `cloudflare-worker/wrangler.toml`:
```toml
name = "pro-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "production"
```

- [ ] **Step 4: Install dependencies**

Run: `cd cloudflare-worker && pnpm install`

- [ ] **Step 5: Commit**

```bash
git add cloudflare-worker/
git commit -m "chore: initialize cloudflare-worker project"
```

---

## Task 2: Create CORS Utility

**Files:**
- Create: `cloudflare-worker/src/utils/cors.ts`

- [ ] **Step 1: Create CORS origin validator**

Create `cloudflare-worker/src/utils/cors.ts`:
```typescript
const allowedPatterns = [
  /^https:\/\/[\w-]+\.surge\.sh$/,
  /^https:\/\/[\w-]+\.pages\.dev$/,
  /^https:\/\/preview\.pro\.ant\.design$/,
  /^http:\/\/localhost:\d+$/,
];

export const corsOrigin = (origin: string): boolean => {
  return allowedPatterns.some((pattern) => pattern.test(origin));
};
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/utils/cors.ts
git commit -m "feat: add CORS origin validator"
```

---

## Task 3: Create User Data

**Files:**
- Create: `cloudflare-worker/src/data/user.ts`

- [ ] **Step 1: Create user mock data**

Create `cloudflare-worker/src/data/user.ts`:
```typescript
export const currentUser = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  tags: [
    { key: '0', label: '很有想法的' },
    { key: '1', label: '专注设计' },
    { key: '2', label: '辣~' },
    { key: '3', label: '大长腿' },
    { key: '4', label: '川妹子' },
    { key: '5', label: '海纳百川' },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  access: 'admin',
  geographic: {
    province: { label: '浙江省', key: '330000' },
    city: { label: '杭州市', key: '330100' },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
};

export const userList = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
];
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/data/user.ts
git commit -m "feat: add user mock data"
```

---

## Task 4: Create User Routes

**Files:**
- Create: `cloudflare-worker/src/routes/user.ts`

- [ ] **Step 1: Create user routes handler**

Create `cloudflare-worker/src/routes/user.ts`:
```typescript
import { Hono } from 'hono';
import { currentUser, userList } from '../data/user';

const app = new Hono();

// Login - always succeeds with admin role
app.post('/login/account', async (c) => {
  const body = await c.req.json();
  return c.json({
    status: 'ok',
    type: body.type || 'account',
    currentAuthority: 'admin',
  });
});

// Logout
app.post('/login/outLogin', (c) => {
  return c.json({ data: {}, success: true });
});

// Captcha
app.get('/login/captcha', (c) => {
  return c.json('captcha-xxx');
});

// Register
app.post('/register', (c) => {
  return c.json({ status: 'ok', currentAuthority: 'user', success: true });
});

// Current user - always returns logged-in admin
app.get('/currentUser', (c) => {
  return c.json({
    success: true,
    data: currentUser,
  });
});

// Users list
app.get('/users', (c) => {
  return c.json(userList);
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/user.ts
git commit -m "feat: add user routes (login, currentUser, users)"
```

---

## Task 5: Create Notices Data

**Files:**
- Create: `cloudflare-worker/src/data/notices.ts`

- [ ] **Step 1: Create notices data**

Create `cloudflare-worker/src/data/notices.ts`:
```typescript
export const notices = [
  {
    id: '000000001',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/MSbDR4FR2MUAAAAAAAAAAAAAFl94AQBr',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/hX-PTavYIq4AAAAAAAAAAAAAFl94AQBr',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/jHX5R5l3QjQAAAAAAAAAAAAAFl94AQBr',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Wr4mQqx6jfwAAAAAAAAAAAAAFl94AQBr',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Mzj_TbcWUj4AAAAAAAAAAAAAFl94AQBr',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/eXLzRbPqQE4AAAAAAAAAAAAAFl94AQBr',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000007',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/w5mRQY2AmEEAAAAAAAAAAAAAFl94AQBr',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000008',
    avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/wPadR5M9918AAAAAAAAAAAAAFl94AQBr',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: 'event',
  },
  {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: 'event',
  },
  {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: 'event',
  },
  {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: 'event',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/data/notices.ts
git commit -m "feat: add notices mock data"
```

---

## Task 6: Create Notices Routes

**Files:**
- Create: `cloudflare-worker/src/routes/notices.ts`

- [ ] **Step 1: Create notices route**

Create `cloudflare-worker/src/routes/notices.ts`:
```typescript
import { Hono } from 'hono';
import { notices } from '../data/notices';

const app = new Hono();

app.get('/notices', (c) => {
  return c.json({ data: notices });
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/notices.ts
git commit -m "feat: add notices route"
```

---

## Task 7: Create Dashboard Data

**Files:**
- Create: `cloudflare-worker/src/data/dashboard.ts`

- [ ] **Step 1: Create dashboard chart data**

Create `cloudflare-worker/src/data/dashboard.ts`:
```typescript
const beginDay = Date.now();

// Generate visit data
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
const visitData = fakeY.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
const visitData2 = fakeY2.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

// Generate sales data
const salesData = Array.from({ length: 12 }, (_, i) => ({
  x: `${i + 1}月`,
  y: Math.floor(Math.random() * 1000) + 200,
}));

// Generate search data
const searchData = Array.from({ length: 50 }, (_, i) => ({
  index: i + 1,
  keyword: `搜索关键词-${i}`,
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
}));

const salesTypeData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
];

const salesTypeDataOnline = [
  { x: '家用电器', y: 244 },
  { x: '食用酒水', y: 321 },
  { x: '个护健康', y: 311 },
  { x: '服饰箱包', y: 41 },
  { x: '母婴产品', y: 121 },
  { x: '其他', y: 111 },
];

const salesTypeDataOffline = [
  { x: '家用电器', y: 99 },
  { x: '食用酒水', y: 188 },
  { x: '个护健康', y: 344 },
  { x: '服饰箱包', y: 255 },
  { x: '其他', y: 65 },
];

const offlineData = Array.from({ length: 10 }, (_, i) => ({
  name: `Stores ${i}`,
  cvr: Math.ceil(Math.random() * 9) / 10,
}));

const offlineChartData = Array.from({ length: 20 }, (_, i) => {
  const date = new Date(Date.now() + 1000 * 60 * 30 * i);
  return {
    date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  };
}).concat(Array.from({ length: 20 }, (_, i) => {
  const date = new Date(Date.now() + 1000 * 60 * 30 * i);
  return {
    date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
    type: '支付笔数',
    value: Math.floor(Math.random() * 100) + 10,
  };
}));

const radarOriginData = [
  { name: '个人', ref: 10, koubei: 8, output: 4, contribute: 5, hot: 7 },
  { name: '团队', ref: 3, koubei: 9, output: 6, contribute: 3, hot: 1 },
  { name: '部门', ref: 4, koubei: 1, output: 6, contribute: 5, hot: 7 },
];

const radarTitleMap: Record<string, string> = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};

const radarData = radarOriginData.flatMap((item) =>
  Object.entries(item)
    .filter(([key]) => key !== 'name')
    .map(([key, value]) => ({
      name: item.name,
      label: radarTitleMap[key],
      value,
    }))
);

export const analysisChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export const projectNotice = [
  {
    id: 'xxx1',
    title: 'Alipay',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date().toISOString(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: 'Angular',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: '2017-07-24',
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: 'Ant Design',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date().toISOString(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: 'Ant Design Pro',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: '2017-07-23',
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: 'Bootstrap',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    description: '凛冬将至',
    updatedAt: '2017-07-23',
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: 'React',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: '2017-07-23',
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
];

export const activities = [
  {
    id: 'trend-1',
    updatedAt: new Date().toISOString(),
    user: { name: '曲丽丽', avatar: avatars2[0] },
    group: { name: '高逼格设计天团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date().toISOString(),
    user: { name: '付小小', avatar: avatars2[1] },
    group: { name: '高逼格设计天团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date().toISOString(),
    user: { name: '林东东', avatar: avatars2[2] },
    group: { name: '中二少女团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date().toISOString(),
    user: { name: '周星星', avatar: avatars2[4] },
    project: { name: '5 月日常迭代', link: 'http://github.com/' },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date().toISOString(),
    user: { name: '朱偏右', avatar: avatars2[3] },
    project: { name: '工程效能', link: 'http://github.com/' },
    comment: { name: '留言', link: 'http://github.com/' },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date().toISOString(),
    user: { name: '乐哥', avatar: avatars2[5] },
    group: { name: '程序员日常', link: 'http://github.com/' },
    project: { name: '品牌迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/data/dashboard.ts
git commit -m "feat: add dashboard mock data"
```

---

## Task 8: Create Dashboard Routes

**Files:**
- Create: `cloudflare-worker/src/routes/dashboard.ts`

- [ ] **Step 1: Create dashboard routes**

Create `cloudflare-worker/src/routes/dashboard.ts`:
```typescript
import { Hono } from 'hono';
import { analysisChartData, projectNotice, activities } from '../data/dashboard';

const app = new Hono();

app.get('/fake_analysis_chart_data', (c) => {
  return c.json({ data: analysisChartData });
});

app.get('/fake_workplace_chart_data', (c) => {
  return c.json({
    data: {
      visitData: analysisChartData.visitData,
      visitData2: analysisChartData.visitData2,
      salesData: analysisChartData.salesData,
      searchData: analysisChartData.searchData,
      offlineData: analysisChartData.offlineData,
      offlineChartData: analysisChartData.offlineChartData.map((item) => ({
        x: item.date,
        y1: item.value,
        y2: Math.floor(Math.random() * 100) + 10,
      })),
      salesTypeData: analysisChartData.salesTypeData,
      salesTypeDataOnline: analysisChartData.salesTypeDataOnline,
      salesTypeDataOffline: analysisChartData.salesTypeDataOffline,
      radarData: analysisChartData.radarData,
    },
  });
});

app.get('/project/notice', (c) => {
  return c.json({ data: projectNotice });
});

app.get('/activities', (c) => {
  return c.json({ data: activities });
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/dashboard.ts
git commit -m "feat: add dashboard routes"
```

---

## Task 9: Create Table Data

**Files:**
- Create: `cloudflare-worker/src/data/table.ts`

- [ ] **Step 1: Create table data generator**

Create `cloudflare-worker/src/data/table.ts`:
```typescript
export interface RuleListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: string;
  createdAt: string;
  progress: number;
}

const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
  'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
];

const generateTableData = (count: number): RuleListItem[] => {
  const today = new Date().toISOString().split('T')[0];
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: avatars[i % 2],
    name: `TradeCode ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: today,
    createdAt: today,
    progress: Math.ceil(Math.random() * 100),
  })).reverse();
};

// Pre-generate 100 items
export const tableListDataSource = generateTableData(100);
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/data/table.ts
git commit -m "feat: add table mock data"
```

---

## Task 10: Create Table Routes

**Files:**
- Create: `cloudflare-worker/src/routes/table.ts`

- [ ] **Step 1: Create table routes with pagination and filtering**

Create `cloudflare-worker/src/routes/table.ts`:
```typescript
import { Hono } from 'hono';
import { tableListDataSource, type RuleListItem } from '../data/table';

const app = new Hono();

app.get('/rule', (c) => {
  const { current = '1', pageSize = '10', name, sorter, filter } = c.req.query();

  let dataSource = [...tableListDataSource];
  const currentNum = parseInt(current, 10);
  const pageSizeNum = parseInt(pageSize, 10);

  // Filter by name
  if (name) {
    dataSource = dataSource.filter((item) => item.name.includes(name));
  }

  // Sort
  if (sorter) {
    const sorterObj = JSON.parse(sorter);
    dataSource.sort((prev, next) => {
      let sortNumber = 0;
      for (const key of Object.keys(sorterObj) as Array<keyof RuleListItem>) {
        const prevVal = prev[key] as number;
        const nextVal = next[key] as number;
        if (sorterObj[key] === 'descend') {
          sortNumber += prevVal > nextVal ? -1 : 1;
        } else {
          sortNumber += prevVal > nextVal ? 1 : -1;
        }
      }
      return sortNumber;
    });
  }

  // Filter
  if (filter) {
    const filterObj = JSON.parse(filter) as Record<string, string[]>;
    if (Object.keys(filterObj).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filterObj).some((key) => {
          const filterValues = filterObj[key];
          if (!filterValues || filterValues.length === 0) return true;
          return filterValues.includes(`${item[key as keyof RuleListItem]}`);
        });
      });
    }
  }

  // Pagination
  const start = (currentNum - 1) * pageSizeNum;
  const end = currentNum * pageSizeNum;
  const paginatedData = dataSource.slice(start, end);

  return c.json({
    data: paginatedData,
    total: dataSource.length,
    success: true,
    pageSize: pageSizeNum,
    current: currentNum,
  });
});

app.post('/rule', async (c) => {
  const body = await c.req.json();
  const { method, name, desc, key } = body;

  if (method === 'delete' && Array.isArray(key)) {
    // Return success for delete
    return c.json({
      list: tableListDataSource.filter((item) => !key.includes(item.key)),
      pagination: { total: tableListDataSource.length },
    });
  }

  if (method === 'post') {
    const newItem: RuleListItem = {
      key: tableListDataSource.length,
      href: 'https://ant.design',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      name,
      owner: '曲丽丽',
      desc,
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 2,
      updatedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      progress: Math.ceil(Math.random() * 100),
    };
    return c.json(newItem);
  }

  if (method === 'update') {
    return c.json({ key, name, desc });
  }

  return c.json({ success: true });
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/table.ts
git commit -m "feat: add table routes with pagination and filtering"
```

---

## Task 11: Create Monitor Routes

**Files:**
- Create: `cloudflare-worker/src/routes/monitor.ts`

- [ ] **Step 1: Create monitor routes**

Create `cloudflare-worker/src/routes/monitor.ts`:
```typescript
import { Hono } from 'hono';

const app = new Hono();

app.get('/tags', (c) => {
  // Generate 100 random tags
  const list = Array.from({ length: 100 }, (_, i) => ({
    name: `${['北京', '上海', '广州', '深圳', '杭州'][i % 5]}${i}`,
    value: Math.floor(Math.random() * 100) + 50,
    type: i % 3,
  }));

  return c.json({
    data: { list },
  });
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/monitor.ts
git commit -m "feat: add monitor routes"
```

---

## Task 12: Create Error Routes

**Files:**
- Create: `cloudflare-worker/src/routes/errors.ts`

- [ ] **Step 1: Create error test routes**

Create `cloudflare-worker/src/routes/errors.ts`:
```typescript
import { Hono } from 'hono';

const app = new Hono();

app.get('/500', (c) => {
  return c.json(
    {
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    },
    500
  );
});

app.get('/404', (c) => {
  return c.json(
    {
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    },
    404
  );
});

app.get('/403', (c) => {
  return c.json(
    {
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    },
    403
  );
});

app.get('/401', (c) => {
  return c.json(
    {
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    },
    401
  );
});

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/routes/errors.ts
git commit -m "feat: add error test routes"
```

---

## Task 13: Create Main Entry Point

**Files:**
- Create: `cloudflare-worker/src/index.ts`

- [ ] **Step 1: Create main Hono app with CORS and routes**

Create `cloudflare-worker/src/index.ts`:
```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userRoutes from './routes/user';
import dashboardRoutes from './routes/dashboard';
import tableRoutes from './routes/table';
import noticesRoutes from './routes/notices';
import monitorRoutes from './routes/monitor';
import errorRoutes from './routes/errors';
import { corsOrigin } from './utils/cors';

const app = new Hono();

// CORS middleware
app.use('/*', async (c, next) => {
  const origin = c.req.header('Origin') || '';
  const corsMiddleware = cors({
    origin: corsOrigin(origin) ? origin : 'https://preview.pro.ant.design',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });
  return corsMiddleware(c, next);
});

// Auth routes config
app.get('/api/auth_routes', (c) => {
  return c.json({
    '/form/advanced-form': { authority: ['admin', 'user'] },
  });
});

// Mount routes under /api
app.route('/api', userRoutes);
app.route('/api', dashboardRoutes);
app.route('/api', tableRoutes);
app.route('/api', noticesRoutes);
app.route('/api', monitorRoutes);
app.route('/api', errorRoutes);

export default app;
```

- [ ] **Step 2: Commit**

```bash
git add cloudflare-worker/src/index.ts
git commit -m "feat: add main entry point with CORS and routes"
```

---

## Task 14: Test Locally

**Files:**
- None (testing only)

- [ ] **Step 1: Start local development server**

Run: `cd cloudflare-worker && pnpm run dev`

Expected: Server running at `http://localhost:8787`

- [ ] **Step 2: Test key endpoints**

```bash
# Test login
curl -X POST http://localhost:8787/api/login/account \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ant.design","type":"account"}'

# Test currentUser
curl http://localhost:8787/api/currentUser

# Test table with pagination
curl "http://localhost:8787/api/rule?current=1&pageSize=10"

# Test CORS preflight
curl -X OPTIONS http://localhost:8787/api/currentUser \
  -H "Origin: https://test.surge.sh" \
  -H "Access-Control-Request-Method: GET"
```

Expected: All requests return correct JSON responses

---

## Task 15: Update ant-design-pro API URL

**Files:**
- Modify: `src/app.tsx:153`
- Modify: `config/proxy.ts:28-35`

- [ ] **Step 1: Update baseURL in src/app.tsx**

Edit `src/app.tsx`:
```typescript
// Change line 153 from:
baseURL: isDev ? '' : 'https://proapi.azurewebsites.net',
// To:
baseURL: isDev ? '' : 'https://pro-api.afc163.workers.dev',
```

- [ ] **Step 2: Remove Azure proxy config in config/proxy.ts**

Edit `config/proxy.ts`:
```typescript
// Remove or comment out lines 28-35:
// test: {
//   '/api/': {
//     target: 'https://proapi.azurewebsites.net',
//     changeOrigin: true,
//     pathRewrite: { '^': '' },
//   },
// },
```

- [ ] **Step 3: Commit**

```bash
git add src/app.tsx config/proxy.ts
git commit -m "feat: update API URL to cloudflare worker"
```

---

## Task 16: Deploy and Final Commit

**Files:**
- None (deployment)

- [ ] **Step 1: Deploy to Cloudflare Workers**

Run: `cd cloudflare-worker && pnpm run deploy`

Expected: Successfully deployed to `https://pro-api.afc163.workers.dev`

- [ ] **Step 2: Verify production deployment**

```bash
# Test production API
curl https://pro-api.afc163.workers.dev/api/currentUser
```

Expected: Returns user data JSON

- [ ] **Step 3: Final commit if any changes**

```bash
git add -A
git commit -m "feat: complete cloudflare worker API migration"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Initialize Cloudflare Worker project |
| 2 | Create CORS utility |
| 3 | Create user data |
| 4 | Create user routes |
| 5 | Create notices data |
| 6 | Create notices routes |
| 7 | Create dashboard data |
| 8 | Create dashboard routes |
| 9 | Create table data |
| 10 | Create table routes |
| 11 | Create monitor routes |
| 12 | Create error routes |
| 13 | Create main entry point |
| 14 | Test locally |
| 15 | Update ant-design-pro API URL |
| 16 | Deploy and final commit |