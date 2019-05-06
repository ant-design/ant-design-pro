import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/analysis/fake_chart_data');
}
