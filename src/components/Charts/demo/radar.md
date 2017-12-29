---
order: 7
title: Radar Chart
---

````jsx
import { Radar, ChartCard } from 'ant-design-pro/lib/Charts';

const radarOriginData = [
  {
    name: 'Personal',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: 'Team',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: 'Department',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: 'Quote',
  koubei: 'Word Of Mouth',
  output: 'Yield',
  contribute: 'Contribution',
  hot: 'Hot',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

ReactDOM.render(
  <ChartCard title="Data Ratio">
    <Radar
      hasLegend
      height={286}
      data={radarData}
    />
  </ChartCard>
, mountNode);
````
