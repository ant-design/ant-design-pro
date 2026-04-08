import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dashboardRoutes from './routes/dashboard';
import errorRoutes from './routes/errors';
import geographicRoutes from './routes/geographic';
import listRoutes from './routes/list';
import monitorRoutes from './routes/monitor';
import noticesRoutes from './routes/notices';
import profileRoutes from './routes/profile';
import settingsRoutes from './routes/settings';
import tableRoutes from './routes/table';
import userRoutes from './routes/user';
import { corsOrigin } from './utils/cors';

const app = new Hono();

// CORS middleware
app.use(
  '/*',
  cors({
    origin: (origin) =>
      corsOrigin(origin) ? origin : 'https://preview.pro.ant.design',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

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
app.route('/api/monitor', monitorRoutes);
app.route('/api', errorRoutes);
app.route('/api/geographic', geographicRoutes);
app.route('/api', listRoutes);
app.route('/api/profile', profileRoutes);
app.route('/api', settingsRoutes);

// 404 handler with URL in message
app.notFound((c) => {
  const url = c.req.url;
  return c.json(
    {
      message: `Response status: 404, URL: ${url}`,
      success: false,
    },
    404,
  );
});

export default app;
