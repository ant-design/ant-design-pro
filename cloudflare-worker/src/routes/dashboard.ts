import { Hono } from 'hono';
import {
  activities,
  analysisChartData,
  projectNotice,
} from '../data/dashboard';

const app = new Hono();

app.get('/fake_analysis_chart_data', (c) => {
  return c.json({ data: analysisChartData });
});

app.get('/fake_workplace_chart_data', (c) => {
  return c.json({
    data: {
      visitData: analysisChartData.visitData,
      visitData2: analysisChartData.visitData2,
      salesData: analysisChartData.salesData,
      searchData: analysisChartData.searchData,
      offlineData: analysisChartData.offlineData,
      offlineChartData: analysisChartData.offlineChartData.map((item) => ({
        x: item.date,
        y1: item.value,
        y2: Math.floor(Math.random() * 100) + 10,
      })),
      salesTypeData: analysisChartData.salesTypeData,
      salesTypeDataOnline: analysisChartData.salesTypeDataOnline,
      salesTypeDataOffline: analysisChartData.salesTypeDataOffline,
      radarData: analysisChartData.radarData,
    },
  });
});

app.get('/project/notice', (c) => {
  return c.json({ data: projectNotice });
});

app.get('/activities', (c) => {
  return c.json({ data: activities });
});

export default app;
