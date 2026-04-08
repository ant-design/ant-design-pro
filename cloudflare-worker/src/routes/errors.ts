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
    500,
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
    404,
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
    403,
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
    401,
  );
});

export default app;
