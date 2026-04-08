export interface RuleListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: string;
  createdAt: string;
  progress: number;
}

const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
  'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
];

const generateTableData = (count: number): RuleListItem[] => {
  const today = new Date().toISOString().split('T')[0];
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: avatars[i % 2],
    name: `TradeCode ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: today,
    createdAt: today,
    progress: Math.ceil(Math.random() * 100),
  })).reverse();
};

export const tableListDataSource = generateTableData(100);
