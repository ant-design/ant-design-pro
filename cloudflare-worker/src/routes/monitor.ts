import { Hono } from 'hono';
import mapGeoData from '../data/map-geo.json';
import mapGridData from '../data/map-grid.json';

const app = new Hono();

app.get('/tags', (c) => {
  const list = Array.from({ length: 100 }, (_, i) => ({
    name: `${['北京', '上海', '广州', '深圳', '杭州'][i % 5]}${i}`,
    // Deterministic value based on index for reproducible results
    value: ((i * 17) % 100) + 50,
    type: i % 3,
  }));

  return c.json({
    data: { list },
  });
});

// Map geo data endpoint
app.get('/map-geo', (c) => {
  return c.json(mapGeoData);
});

// Map grid data endpoint
app.get('/map-grid', (c) => {
  return c.json(mapGridData);
});

export default app;
