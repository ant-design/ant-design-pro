import { Hono } from 'hono';
import { defaultUser } from '../data/common';

const app = new Hono();

// GET /api/accountSettingCurrentUser
app.get('/accountSettingCurrentUser', (c) => {
  return c.json({
    data: defaultUser,
  });
});

export default app;
