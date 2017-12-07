---
order: 8
title: 水波图 
---

水波图是一种比例的展示方式，可以更直观的展示关键值的占比。

````jsx
import { WaterWave } from 'ant-design-pro/lib/Charts';

ReactDOM.render(
  <div style={{ textAlign: 'center' }}>
    <WaterWave
      height={161}
      title="补贴资金剩余"
      percent={34}
    />
  </div>
, mountNode);
````
