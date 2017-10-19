---
order: 2
title: 带浮层卡片
---

点击展开通知卡片，展现多种类型的通知，通常放在顶部通栏。

````jsx
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import moment from 'moment';
import { Tag } from 'antd';

const data = [{
  key: '1',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '曲丽丽 评论了你',
  description: '描述信息描述信息描述信息',
  datetime: moment('2017-08-07').fromNow(),
}, {
  key: '2',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '朱偏右 回复了你',
  description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  datetime: moment('2017-08-07').fromNow(),
}, {
  key: '3',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  title: '标题',
  description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  datetime: moment('2017-08-07').fromNow(),
  extra: <Tag color="red">标签</Tag>,
}];

function onItemClick(item, tabProps) {
  console.log(item, tabProps);
}

function onClear(tabTitle) {
  console.log(tabTitle);
}

ReactDOM.render(
  <div
    style={{
      textAlign: 'right',
      height: '64px',
      lineHeight: '64px',
      boxShadow: '0 1px 4px rgba(0,21,41,.12)',
      padding: '0 32px',
      width: '400px',
    }}
  >
    <NoticeIcon count={5} onItemClick={onItemClick} onClear={onClear}>
      <NoticeIcon.Tab
        list={noticeData['通知']}
        title="通知"
        emptyText="你已查看所有通知"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
      />
      <NoticeIcon.Tab
        list={noticeData['消息']}
        title="消息"
        emptyText="您已读完所有消息"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      />
      <NoticeIcon.Tab
        list={noticeData['待办']}
        title="待办"
        emptyText="你已完成所有待办"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
      />
    </NoticeIcon>
  </div>
, mountNode);
````
