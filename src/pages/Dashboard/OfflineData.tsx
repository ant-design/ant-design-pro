import { Pie, TimelineChart } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import { Card, Col, Row, Tabs } from 'antd';
import React, { memo } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale';
import styles from './Analysis.less';

interface CustomTabProps {
  data: {
    name: string;
    cvr: number;
  };
  currentTabKey: string;
}

const CustomTab: (obj: CustomTabProps) => JSX.Element = ({ data, currentTabKey: currentKey }) => (
  <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle={
          <FormattedMessage id="app.analysis.conversion-rate" defaultMessage="Conversion Rate" />
        }
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name && 'light'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36 }}>
      <Pie
        animate={false}
        color={currentKey !== data.name && '#BDE4FF'}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.cvr * 100}
        height={64}
      />
    </Col>
  </Row>
);

const { TabPane } = Tabs;
interface OfflineDataProps {
  activeKey: string;
  loading: boolean;
  offlineData: any[];
  offlineChartData: any[];
  handleTabChange: (activeKey: string) => void;
}

const OfflineData: React.FC<OfflineDataProps> = ({
  activeKey,
  loading,
  offlineData,
  offlineChartData,
  handleTabChange,
}) => (
  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      {offlineData.map(shop => (
        <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
          <div style={{ padding: '0 24px' }}>
            <TimelineChart
              height={400}
              data={offlineChartData}
              titleMap={{
                y1: formatMessage({ id: 'app.analysis.traffic' }),
                y2: formatMessage({ id: 'app.analysis.payments' }),
              }}
            />
          </div>
        </TabPane>
      ))}
    </Tabs>
  </Card>
);

export default memo(OfflineData);
