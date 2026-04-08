import { Hono } from 'hono';

const app = new Hono();

app.get('/tags', (c) => {
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
