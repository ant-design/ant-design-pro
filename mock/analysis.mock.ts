import type { Request, Response } from 'express';

const beginDay = Date.now();

// Generate visit data
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
const visitData = fakeY.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
const visitData2 = fakeY2.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

// Generate sales data
const salesData = Array.from({ length: 12 }, (_, i) => ({
  x: `${i + 1}月`,
  y: Math.floor(Math.random() * 1000) + 200,
}));

// Generate search data
const searchData = Array.from({ length: 50 }, (_, i) => ({
  index: i + 1,
  keyword: `搜索关键词-${i}`,
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
}));

const salesTypeData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
];

const salesTypeDataOnline = [
  { x: '家用电器', y: 244 },
  { x: '食用酒水', y: 321 },
  { x: '个护健康', y: 311 },
  { x: '服饰箱包', y: 41 },
  { x: '母婴产品', y: 121 },
  { x: '其他', y: 111 },
];

const salesTypeDataOffline = [
  { x: '家用电器', y: 99 },
  { x: '食用酒水', y: 188 },
  { x: '个护健康', y: 344 },
  { x: '服饰箱包', y: 255 },
  { x: '其他', y: 65 },
];

const offlineData = Array.from({ length: 10 }, (_, i) => ({
  name: `Stores ${i}`,
  cvr: Math.ceil(Math.random() * 9) / 10,
}));

const offlineChartData = Array.from({ length: 20 }, (_, i) => {
  const date = new Date(Date.now() + 1000 * 60 * 30 * i);
  return {
    date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  };
}).concat(
  Array.from({ length: 20 }, (_, i) => {
    const date = new Date(Date.now() + 1000 * 60 * 30 * i);
    return {
      date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
      type: '支付笔数',
      value: Math.floor(Math.random() * 100) + 10,
    };
  }),
);

const radarOriginData = [
  { name: '个人', ref: 10, koubei: 8, output: 4, contribute: 5, hot: 7 },
  { name: '团队', ref: 3, koubei: 9, output: 6, contribute: 3, hot: 1 },
  { name: '部门', ref: 4, koubei: 1, output: 6, contribute: 5, hot: 7 },
];

const radarTitleMap: Record<string, string> = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};

const radarData = radarOriginData.flatMap((item) =>
  Object.entries(item)
    .filter(([key]) => key !== 'name')
    .map(([key, value]) => ({
      name: item.name,
      label: radarTitleMap[key],
      value,
    })),
);

const analysisChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

const fakeChartData = (_: Request, res: Response) => {
  return res.json({ data: analysisChartData });
};

export default {
  'GET /api/fake_analysis_chart_data': fakeChartData,
};