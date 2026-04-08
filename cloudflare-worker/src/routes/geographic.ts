import { Hono } from 'hono';

const app = new Hono();

// Province data - simplified with key/label format
const provinceData = [
  { label: '北京市', key: '110000' },
  { label: '天津市', key: '120000' },
  { label: '河北省', key: '130000' },
  { label: '山西省', key: '140000' },
  { label: '内蒙古自治区', key: '150000' },
  { label: '辽宁省', key: '210000' },
  { label: '吉林省', key: '220000' },
  { label: '黑龙江省', key: '230000' },
  { label: '上海市', key: '310000' },
  { label: '江苏省', key: '320000' },
  { label: '浙江省', key: '330000' },
  { label: '安徽省', key: '340000' },
  { label: '福建省', key: '350000' },
  { label: '江西省', key: '360000' },
  { label: '山东省', key: '370000' },
  { label: '河南省', key: '410000' },
  { label: '湖北省', key: '420000' },
  { label: '湖南省', key: '430000' },
  { label: '广东省', key: '440000' },
  { label: '广西壮族自治区', key: '450000' },
  { label: '海南省', key: '460000' },
  { label: '重庆市', key: '500000' },
  { label: '四川省', key: '510000' },
  { label: '贵州省', key: '520000' },
  { label: '云南省', key: '530000' },
  { label: '西藏自治区', key: '540000' },
  { label: '陕西省', key: '610000' },
  { label: '甘肃省', key: '620000' },
  { label: '青海省', key: '630000' },
  { label: '宁夏回族自治区', key: '640000' },
  { label: '新疆维吾尔自治区', key: '650000' },
  { label: '台湾省', key: '710000' },
  { label: '香港特别行政区', key: '810000' },
  { label: '澳门特别行政区', key: '820000' },
];

// City data - moved outside handler for performance
const cityData: Record<string, { label: string; key: string }[]> = {
  '110000': [{ label: '市辖区', key: '110100' }],
  '120000': [{ label: '市辖区', key: '120100' }],
  '310000': [{ label: '市辖区', key: '310100' }],
  '330000': [
    { label: '杭州市', key: '330100' },
    { label: '宁波市', key: '330200' },
    { label: '温州市', key: '330300' },
    { label: '嘉兴市', key: '330400' },
    { label: '湖州市', key: '330500' },
    { label: '绍兴市', key: '330600' },
    { label: '金华市', key: '330700' },
    { label: '衢州市', key: '330800' },
    { label: '舟山市', key: '330900' },
    { label: '台州市', key: '331000' },
    { label: '丽水市', key: '331100' },
  ],
  '440000': [
    { label: '广州市', key: '440100' },
    { label: '韶关市', key: '440200' },
    { label: '深圳市', key: '440300' },
    { label: '珠海市', key: '440400' },
    { label: '汕头市', key: '440500' },
    { label: '佛山市', key: '440600' },
    { label: '江门市', key: '440700' },
    { label: '湛江市', key: '440800' },
    { label: '茂名市', key: '440900' },
    { label: '肇庆市', key: '441200' },
    { label: '惠州市', key: '441300' },
    { label: '梅州市', key: '441400' },
    { label: '汕尾市', key: '441500' },
    { label: '河源市', key: '441600' },
    { label: '阳江市', key: '441700' },
    { label: '清远市', key: '441800' },
    { label: '东莞市', key: '441900' },
    { label: '中山市', key: '442000' },
  ],
};

// GET /api/geographic/province
app.get('/province', (c) => {
  return c.json({
    data: provinceData,
  });
});

// GET /api/geographic/city/:province
app.get('/city/:province', (c) => {
  const province = c.req.param('province');

  // Return data for the province, or empty array if not found
  return c.json({
    data: cityData[province] || [],
  });
});

export default app;
