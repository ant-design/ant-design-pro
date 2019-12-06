import request from '@/utils/request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
