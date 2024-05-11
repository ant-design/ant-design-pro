import { fetchStats } from '@/services/ant-design-pro/api';
import React, { useEffect, useState } from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import axios from 'axios';

interface StatsData {
  online: number;
  offline: number;
  total: number;
}

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);

  // 通过 request 属性模拟远程请求
  // const fetchStats = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get<StatsData>('https://867t766n6.zicp.fun/computers/stats'); // 更新为实际的 API 地址
  //     setStats(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     message.error('无法获取统计数据，请稍后再试。');
  //     setLoading(false);
  //   }
  // };

  // 获取统计数据
  const getStats = async () => {
    setLoading(true);
    try {
      const response = await fetchStats();
      setStats(response);
    } catch (error) {
      message.error('无法获取统计数据，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };
  
  // 初始化时获取统计数据
  useEffect(() => {
    getStats();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={fetchStats} style={{ marginBottom: 16 }}>
        刷新统计数据
      </Button>
      <ProCard
        gutter={[16, 16]}
        loading={loading}
        title="设备状态统计"
        headerBordered
      >
        <StatisticCard
          statistic={{
            title: '在线设备数量',
            value: stats ? stats.online : 0,
            valueStyle: { color: '#3f8600' },
          }}
        />
        <StatisticCard
          statistic={{
            title: '离线设备数量',
            value: stats ? stats.offline : 0,
            valueStyle: { color: '#cf1322' },
          }}
        />
        <StatisticCard
          statistic={{
            title: '总设备数量',
            value: stats ? stats.total : 0,
          }}
        />
      </ProCard>
    </div>
  );
};

export default StatsPage;
