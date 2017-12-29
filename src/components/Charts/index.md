---
title: 
  en-US: Charts
  zh-CN: Charts
subtitle: Charts
order: 2
cols: 2
---

Ant Design Pro - These are commonly used enterprise charts and are based on [G2](https://antv.alipay.com/g2/doc/index.html) In accordance with the Ant Design chart specification package, it is important to note that Ant Design Pro's charting components are provided as a suite, allowing complex business requirements to be combined in a wide variety of combinations.

Because it combines the standard design of Ant Design and simplifies a large number of API configurations with minimal design and out-of-the-box ideas, so if you need to customize the chart flexibly, refer to the Ant Design Pro chart,[G2](https://antv.alipay.com/g2/doc/index.html) Package chart components to use.

## API

### ChartCard

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| title | Card Title | ReactNode\|string | - |
| action | Card Operations | ReactNode | - |
| total | Total Data | ReactNode\| number | - |
| footer | Card bottom | ReactNode | - |
| contentHeight | Content Area Height | number | - |
| avatar | Right icon | React.ReactNode | - |
### MiniBar

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| color | Chart color | string |`#1890FF` |
| height | Chart height | number | - |
| data | Data | array<{x, y}> | - |

### MiniArea

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| color | Chart color | string |`rgba(24, 144, 255, 0.2)` |
| borderColor | Chart edge color | string |`#1890FF` |
| height | Chart height | number | - |
| line | Whether to display stroke | boolean | false |
| animate | Whether to display animation | boolean | true |
| xAxis | [x Shaft configuration](http://antvis.github.io/g2/doc/tutorial/start/axis.html) | object | - |
| yAxis | [y Shaft configuration](http://antvis.github.io/g2/doc/tutorial/start/axis.html) | object | - |
| data | Data | array<{x, y}> | - |

### MiniProgress

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| target | Target ratio | number | - |
| color | Progress bar color | string | - |
| strokeWidth | Progress bar height | number | - |
| percent | Progress ratio | number | - |

### Bar

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| title | Chart Title | ReactNode\|string | - |
| color | Chart color | string |`rgba(24, 144, 255, 0.85)` |
| margin | Inter-chart spacing | array |\[32, 0, 32, 40\] |
| height | Chart height | number | - |
| data | Data | array<{x, y}> | - |
| autoLabel | Auto-hide the x-axis label | boolean | when width is low`true` |

### Pie

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| animate | Whether to display animation | boolean | true |
| color | Chart color | string |`rgba(24, 144, 255, 0.85)` |
| height | Chart height | number | - |
| hasLegend | Whether to display legend | boolean |`false` |
| margin | Inter-chart spacing | array |\[24, 0, 24, 0\] |
| percent | Proportion | number | - |
| tooltip | Whether to show tooltip | boolean | true |
| valueFormat | Display value formatting function | function | - |
| title | Chart title | ReactNode | string | - |
| subTitle | Chart Subtitle | ReactNode | string | - |
| total | The total number of icons in the middle | string | - |

### Radar

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| title | Chart Title | ReactNode\|string | - |
| height | Chart height | number | - |
| hasLegend | Whether to display legend | boolean |`false` |
| margin | Inter-chart spacing | array |\[24, 30, 16, 30\] |
| data | Icon data | array<{name,label,value}> | - |

### Gauge

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| title | Chart Title | ReactNode\|string | - |
| height | Chart height | number | - |
| color | Chart color | string |`#2F9CFF` |
| bgColor | Chart background color | string |`#F0F2F5` |
| percent | Progress ratio | number | - |

### WaterWave

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| title | Chart Title | ReactNode\|string | - |
| height | Chart height | number | - |
| color | Chart color | string |`#1890FF` |
| percent | Progress ratio | number | - |

### TagCloud

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| data | Title | Array<name, value\> | - |
| height | Height value | number | - |

### TimelineChart

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| data | Title | Array<x, y1, y2\> | - |
| titleMap | Indicator Alias ​​| Object{y1: 'Passenger traffic', y2: 'Pay the number'} | - |
| height | Height value | number | 400 |

### Field

| Parameter | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| label | Title | ReactNode\|string | - |
| value | Value | ReactNode\|string | - |
