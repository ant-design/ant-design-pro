import { Hono } from 'hono';
import { fakeList, defaultUser } from '../data/common';

// Count bounds to prevent memory exhaustion
const COUNT_MIN = 1;
const COUNT_MAX = 100;
const DEFAULT_COUNT = 20;
const DEFAULT_COUNT_SMALL = 5;

function parseCount(value: string | undefined, defaultVal: number): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return defaultVal;
  }
  return Math.max(COUNT_MIN, Math.min(parsed, COUNT_MAX));
}

let sourceData: ReturnType<typeof fakeList> = [];

const app = new Hono();

// GET /api/get_list
app.get('/get_list', (c) => {
  const count = parseCount(c.req.query('count'), DEFAULT_COUNT);
  const result = fakeList(count);
  sourceData = result;
  return c.json({
    data: {
      list: result,
    },
  });
});

// POST /api/post_fake_list
app.post('/post_fake_list', async (c) => {
  const body = await c.req.json();
  const { method, id } = body;
  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter((item: (typeof result)[0]) => item.id !== id);
      break;
    case 'update':
      result = result.map((item: (typeof result)[0]) =>
        item.id === id ? { ...item, ...body } : item,
      );
      break;
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: Date.now(),
      });
      break;
    default:
      break;
  }

  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/card_fake_list
app.get('/card_fake_list', (c) => {
  const count = parseCount(c.req.query('count'), DEFAULT_COUNT);
  const result = fakeList(count);
  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/tags
app.get('/tags', (c) => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push({
      name: ['城市', '省份', '区划'][Math.floor(Math.random() * 3)] + i,
      value: Math.floor(Math.random() * 100) + 1,
      type: Math.floor(Math.random() * 3),
    });
  }
  return c.json({
    data: { list },
  });
});

// GET /api/fake_list_Detail
app.get('/fake_list_Detail', (c) => {
  const count = parseCount(c.req.query('count'), DEFAULT_COUNT_SMALL);
  const result = fakeList(count);
  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/currentUserDetail
app.get('/currentUserDetail', (c) => {
  return c.json({
    data: {
      ...defaultUser,
      notice: [],
    },
  });
});

export default app;