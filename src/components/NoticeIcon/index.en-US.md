---
title: NoticeIcon
subtitle: Notification Menu
cols: 1
order: 9
---

用在导航工具栏上，作为整个产品统一的通知中心。

## API

Property | Description | Type | Default
----|------|-----|------
count | Total number of messages | number | -
bell | Change the bell Icon | ReactNode | `<Icon type='bell' />`
loading | Popup card loading status | boolean | `false`
onClear | Click to clear button the callback | function(tabName) | -
onItemClick | Click on the list item's callback | function(item, tabProps) | -
onLoadMore | Callback of click for loading more | function(tabProps, event) | -
onPopupVisibleChange | Popup Card Showing or Hiding Callbacks | function(visible) | -
onTabChange | Switching callbacks for tabs | function(tabTitle) | -
popupVisible | Popup card display state | boolean | -
locale | Default message text | Object | `{ emptyText: 'No notifications', clear: 'Clear', loadedAll: 'Loaded', loadMore: 'Loading more' }`
clearClose | Close menu after clear | boolean | `false`

### NoticeIcon.Tab

Property | Description | Type | Default
----|------|-----|------
count | Unread messages count of this tab | number | list.length
emptyText | Message text when list is empty | ReactNode | -
emptyImage | Image when list is empty | string | -
list | List data, format refer to the following table | Array | `[]`
loadedAll | All messages have been loaded | boolean | `true`
loading | Loading status of this tab | boolean | `false`
name | identifier for message Tab | string | -
scrollToLoad | Scroll to load | boolean | `true`
skeletonCount | Number of skeleton when tab is loading | number | `5`
skeletonProps | Props of skeleton | SkeletonProps | `{}`
showClear | Clear button display status | boolean | `true`
title | header for message Tab | string | -

### Tab data

Property | Description | Type | Default
----|------|-----|------
avatar | avatar img url | string \| ReactNode | -
title | title | ReactNode | -
description | description info | ReactNode | -
datetime | Timestamps | ReactNode | -
extra | Additional information in the upper right corner of the list item | ReactNode | -
clickClose | Close menu after clicking list item | boolean | `false`
