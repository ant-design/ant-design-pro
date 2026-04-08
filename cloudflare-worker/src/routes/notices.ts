import { Hono } from 'hono';
import { notices } from '../data/notices';

const app = new Hono();

app.get('/notices', (c) => {
  return c.json({ data: notices });
});

export default app;
