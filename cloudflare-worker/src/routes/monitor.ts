import { Hono } from 'hono';

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

// Simplified map-geo data (GeoJSON FeatureCollection)
app.get('/map-geo', (c) => {
  return c.json({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 1,
        geometry: {
          type: 'Point',
          coordinates: [116.4074, 39.9042],
        },
        properties: {
          name: '北京',
          value: 100,
        },
      },
      {
        type: 'Feature',
        id: 2,
        geometry: {
          type: 'Point',
          coordinates: [121.4737, 31.2304],
        },
        properties: {
          name: '上海',
          value: 80,
        },
      },
      {
        type: 'Feature',
        id: 3,
        geometry: {
          type: 'Point',
          coordinates: [113.2644, 23.1291],
        },
        properties: {
          name: '广州',
          value: 70,
        },
      },
      {
        type: 'Feature',
        id: 4,
        geometry: {
          type: 'Point',
          coordinates: [114.0579, 22.5431],
        },
        properties: {
          name: '深圳',
          value: 65,
        },
      },
      {
        type: 'Feature',
        id: 5,
        geometry: {
          type: 'Point',
          coordinates: [120.1551, 30.2741],
        },
        properties: {
          name: '杭州',
          value: 50,
        },
      },
    ],
  });
});

// Simplified map-grid data
app.get('/map-grid', (c) => {
  const features = [];
  for (let i = 0; i < 50; i++) {
    features.push({
      type: 'Feature',
      properties: {
        value: Math.floor(Math.random() * 100),
      },
      geometry: {
        type: 'Point',
        coordinates: [-180 + (i % 10) * 36, 90 - Math.floor(i / 10) * 18],
      },
    });
  }
  return c.json({
    type: 'FeatureCollection',
    features,
  });
});

export default app;
