---
title: NoticeIcon
subtitle: 通知菜单
cols: 1
order: 9
---

用在导航工具栏上，作为整个产品统一的通知中心。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 图标上的消息总数 | number | - |
| bell | translate this please -> Change the bell Icon | ReactNode | `<Icon type='bell' />` |
| loading | 弹出卡片加载状态 | boolean | `false` |
| onClear | 点击清空按钮的回调 | function(tabName) | - |
| onItemClick | 点击列表项的回调 | function(item, tabProps) | - |
| onPopupVisibleChange | 弹出卡片显隐的回调 | function(visible) | - |
| onTabChange | 切换页签的回调 | function(tabTitle) | - |
| onViewMore | 点击查看更多的回调 | function(tabProps, event) | - |
| popupVisible | 控制弹层显隐 | boolean | - |
| locale | 默认文案 | Object | `{ emptyText: 'No notifications', clear: 'Clear', viewMore: 'Loading more' }` |
| clearClose | 点击清空按钮后关闭通知菜单 | boolean | `false` |

### NoticeIcon.Tab

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 当前 Tab 未读消息数量 | number | list.length |
| emptyText | 针对每个 Tab 定制空数据文案 | ReactNode | - |
| emptyImage | 针对每个 Tab 定制空数据图片 | string | - |
| list | 列表数据，格式参照下表 | Array | `[]` |
| showClear | 是否显示清空按钮 | boolean | `true` |
| showViewMore | 是否显示查看更多按钮 | boolean | `false` |
| title | 消息分类的页签标题，实际的文案是 `locale[title] || title` | string | - |

### Tab data

| 参数        | 说明                     | 类型                | 默认值  |
| ----------- | ------------------------ | ------------------- | ------- |
| avatar      | 头像图片链接             | string \| ReactNode | -       |
| title       | 标题                     | ReactNode           | -       |
| description | 描述信息                 | ReactNode           | -       |
| datetime    | 时间戳                   | ReactNode           | -       |
| extra       | 额外信息，在列表项右上角 | ReactNode           | -       |
| clickClose  | 点击列表项关闭通知菜单   | boolean             | `false` |
