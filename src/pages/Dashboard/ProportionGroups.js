import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Pie } from '@/components/Charts';

const ProportionGroups = memo(
  ({ dropdownGroup, salesType, loading, salesPieData, handleChangeSalesType }) => (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="The Proportion of Groups"
      bodyStyle={{ padding: 24 }}
      style={{ marginTop: 24 }}
    >
      <h4 style={{ marginTop: 10, marginBottom: 32 }}>
        Called count
      </h4>
      <Pie
        hasLegend
        subTitle="Called count"
        total={() => {salesPieData.reduce((pre, now) => now.y + pre, 0)}}
        data={salesPieData}
        valueFormat={value => {numeral(value).format('0,0')}}
        height={270}
        lineWidth={4}
        style={{ padding: '8px 0' }}
      />
    </Card>
  )
);

export default ProportionGroups;
