---
type: General
title: NoticeIcon
subtitle: 通知菜单
cols: 1
---

用在顶部导航上，作为整个产品统一的通知中心。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
count | 图标上的消息总数 | number | -
loading | 弹出卡片加载状态 | boolean | false
onClear | 点击清空按钮的回调 | function(tabTitle) | -
onItemClick | 点击列表项的回调 | function(item, tabProps) | -
onTabChange | 切换页签的回调 | function(tabTitle) | -
popupAlign | 弹出卡片的位置配置 | Object [alignConfig](https://github.com/yiminghe/dom-align#alignconfig-object-details) | -
onPopupVisibleChange | 弹出卡片显隐的回调 | function(visible) | -
popupVisible | 控制弹层显隐 | boolean | -
locale | 默认文案 | Object | `{ emptyText: '暂无数据', clear: '清空' }`

### NoticeIcon.Tab

参数 | 说明 | 类型 | 默认值
----|------|-----|------
title | 消息分类的页签标题 | string | -
data | 列表数据，格式参照下表 | Array | `[]`

### Tab data

参数 | 说明 | 类型 | 默认值
----|------|-----|------
avatar | 头像图片链接 | string | -
title | 标题 | ReactNode | -
description | 描述信息 | ReactNode | -
datetime | 时间戳 | ReactNode | -
extra | 额外信息，在列表项右上角 | ReactNode | -
