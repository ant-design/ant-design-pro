import { Hono } from 'hono';
import {
  getCityOptions,
  provinceOptions,
} from '../../../src/utils/chinaDivision';

const app = new Hono();

// GET /api/geographic/province
app.get('/province', (c) => {
  return c.json({
    data: provinceOptions,
  });
});

// GET /api/geographic/city/:province
app.get('/city/:province', (c) => {
  const province = c.req.param('province');

  return c.json({
    data: getCityOptions(province),
  });
});

export default app;
