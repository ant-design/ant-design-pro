---
order: 5
title: Pie Chart
---

````jsx
import { Pie, yuan } from 'ant-design-pro/lib/Charts';

const salesPieData = [
  {
    x: 'Household Appliances',
    y: 4544,
  },
  {
    x: 'Food & Beverages',
    y: 3321,
  },
  {
    x: 'Personal Hygiene',
    y: 3113,
  },
  {
    x: 'Fashion',
    y: 2341,
  },
  {
    x: 'Baby Products',
    y: 1231,
  },
  {
    x: 'Other',
    y: 1231,
  },
];

ReactDOM.render(
  <Pie
    hasLegend
    title="Sales"
    subTitle="Sales"
    total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
    data={salesPieData}
    valueFormat={val => yuan(val)}
    height={294}
  />
, mountNode);
````
