import request from 'umi-request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
