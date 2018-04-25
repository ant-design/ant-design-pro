---
title: NoticeIcon
subtitle: Notification Menu
cols: 1
order: 9
---

用在导航工具栏上，作为整个产品统一的通知中心。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
count | Total number of messages | number | -
loading | Popup card loading status | boolean | false
onClear | Click to clear button the callback  | function(tabTitle) | -
onItemClick | Click on the list item's callback | function(item, tabProps) | -
onTabChange | Switching callbacks for tabs | function(tabTitle) | -
popupAlign | Popup card location configuration | Object [alignConfig](https://github.com/yiminghe/dom-align#alignconfig-object-details) | -
onPopupVisibleChange | Popup Card Showing or Hiding Callbacks | function(visible) | -
popupVisible | Popup card display state | boolean | -
locale | Default message text | Object | `{ emptyText: '暂无数据', clear: '清空' }`

### NoticeIcon.Tab

参数 | 说明 | 类型 | 默认值
----|------|-----|------
title |  header for message Tab | string | -
list | List data, format refer to the following table | Array | `[]`
hideClear | Clear button display status | boolean | false
emptyText |  message text when list is empty  | ReactNode | -
emptyImage | image  when list is empty  | string | -


### Tab data

参数 | 说明 | 类型 | 默认值
----|------|-----|------
avatar | avatar img url  | string | -
title | title | ReactNode | -
description | description info | ReactNode | -
datetime | Timestamps | ReactNode | -
extra |Additional information in the upper right corner of the list item | ReactNode | -
