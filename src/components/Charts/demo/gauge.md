---
order: 7
title: Dashboard
---

The dashboard intuitively shows progress, often in percentages.

````jsx
import { Gauge } from 'ant-design-pro/lib/Charts';

ReactDOM.render(
  <Gauge
    title="Cancellation Rate"
    height={164}
    percent={87}
  />
, mountNode);
````
