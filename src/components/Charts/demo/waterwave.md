---
order: 8
title: Water Wave Chart
---

A water wave chart is a kind of proportional display method, which can show the proportion of the key and value more intuitively.

````jsx
import { WaterWave } from 'ant-design-pro/lib/Charts';

ReactDOM.render(
  <div style={{ textAlign: 'center' }}>
    <WaterWave
      height={161}
      title="Funds Remaining"
      percent={34}
    />
  </div>
, mountNode);
````
