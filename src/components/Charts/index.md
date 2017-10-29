---
title: Charts
subtitle: 图表
order: 2
cols: 2
---

Ant Design Pro 提供的业务中常用的图表类型，都是基于 [G2](https://antv.alipay.com/g2/doc/index.html) 按照 Ant Design 图表规范封装，需要注意的是 Ant Design Pro 的图表组件以套件形式提供，可以任意组合实现复杂的业务需求。

因为结合了 Ant Design 的标准设计，本着极简的设计思想以及开箱即用的理念，简化了大量 API 配置，所以如果需要灵活定制图表，可以参考 Ant Design Pro 图表实现，自行基于 [G2](https://antv.alipay.com/g2/doc/index.html) 封装图表组件使用。

## API

### ChartCard

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | 卡片标题 | ReactNode\|string | - |
| action | 卡片操作 | ReactNode | - |
| total | 数据总量 | ReactNode \| number | - |
| footer | 卡片底部 | ReactNode | - |
| contentHeight | 内容区域高度 | number | - |

### MiniBar

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| color | 图表颜色 | string | `#1890FF` |
| height | 图表高度 | number | - |
| data | 数据 | array<{x, y}> | - |

### MiniArea

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| color | 图表颜色 | string | `rgba(24, 144, 255, 0.2)` |
| borderColor | 图表边颜色 | string | `#1890FF` |
| height | 图表高度 | number | - |
| line | 是否显示描边 | boolean | false |
| animate | 是否显示动画 | boolean | true |
| xAxis | [x 轴配置](https://antv.alipay.com/g2/doc/tutorial/start/axis.html) | object | - |
| yAxis | [y 轴配置](https://antv.alipay.com/g2/doc/tutorial/start/axis.html) | object | - |
| data | 数据 | array<{x, y}> | - |

### MiniProgress

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| target | 目标比例 | number | - |
| color | 进度条颜色 | string | - |
| strokeWidth | 进度条高度 | number | - |
| percent | 进度比例 | number | - |

### Bar

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | 图表标题 | ReactNode\|string | - |
| color | 图表颜色 | string | `rgba(24, 144, 255, 0.85)` |
| margin | 图表内部间距 | array | \[32, 0, 32, 40\] |
| height | 图表高度 | number | - |
| data | 数据 | array<{x, y}> | - |

### Pie

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| animate | 是否显示动画 | boolean | true |
| color | 图表颜色 | string | `rgba(24, 144, 255, 0.85)` |
| height | 图表高度 | number | - |
| hasLegend | 是否显示 legend | boolean | `false` |
| margin | 图表内部间距 | array | \[24, 0, 24, 0\] |
| percent | 占比 | number | - |
| tooltip | 是否显示 tooltip | boolean | true |
| valueFormat | 显示值的格式化函数 | function | - |
| subTitle | 图表子标题 | ReactNode\|string | - |

### Radar

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | 图表标题 | ReactNode\|string | - |
| height | 图表高度 | number | - |
| hasLegend | 是否显示 legend | boolean | `false` |
| margin | 图表内部间距 | array | \[24, 30, 16, 30\] |

### Gauge

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | 图表标题 | ReactNode\|string | - |
| height | 图表高度 | number | - |
| color | 图表颜色 | string | `#2F9CFF` |
| bgColor | 图表北京颜色 | string | `#F0F2F5` |
| percent | 进度比例 | number | - |

### WaterWave

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | 图表标题 | ReactNode\|string | - |
| height | 图表高度 | number | - |
| color | 图表颜色 | string | `#1890FF` |
| percent | 进度比例 | number | - |

### TagCloud

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| tags | 标题 | Array<name, value\> | - |
| height | 高度值 | number | - |

### TimelineChart

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| data | 标题 | Array<x, y1, y2\> | - |
| titleMap | 指标别名 | Object{y1: '客流量', y2: '支付笔数'} | - |
| height | 高度值 | number | 400 |

### Field

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| label | 标题 | ReactNode\|string | - |
| value | 值 | ReactNode\|string | - |
