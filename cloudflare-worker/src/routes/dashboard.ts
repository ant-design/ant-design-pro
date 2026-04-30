import { Hono } from 'hono';
import {
  getActivities,
  getAnalysisChartData,
  getProjectNotice,
} from '../data/dashboard';

const app = new Hono();

app.get('/fake_analysis_chart_data', (c) => {
  return c.json({ data: getAnalysisChartData() });
});

app.get('/fake_workplace_chart_data', (c) => {
  const analysisChartData = getAnalysisChartData();
  return c.json({
    data: {
      visitData: analysisChartData.visitData,
      visitData2: analysisChartData.visitData2,
      salesData: analysisChartData.salesData,
      searchData: analysisChartData.searchData,
      offlineData: analysisChartData.offlineData,
      offlineChartData: analysisChartData.offlineChartData.map(
        (item, index) => ({
          x: item.date,
          y1: item.value,
          // Deterministic value based on index for reproducible results
          y2: ((index * 23) % 100) + 10,
        }),
      ),
      salesTypeData: analysisChartData.salesTypeData,
      salesTypeDataOnline: analysisChartData.salesTypeDataOnline,
      salesTypeDataOffline: analysisChartData.salesTypeDataOffline,
      radarData: analysisChartData.radarData,
    },
  });
});

app.get('/project/notice', (c) => {
  return c.json({ data: getProjectNotice() });
});

app.get('/activities', (c) => {
  return c.json({ data: getActivities() });
});

export default app;
