import { Hono } from 'hono';
import { currentUser, userList } from '../data/user';

const app = new Hono();

// Login - always succeeds with admin role
app.post('/login/account', async (c) => {
  let body: { type?: string } = {};
  try {
    body = await c.req.json();
  } catch {
    return c.json({ status: 'error', message: 'Invalid JSON body' }, 400);
  }
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
  return c.json({ data: userList });
});

export default app;
