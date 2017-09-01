---
order: 2
title: 带浮层卡片
---

点击展开通知卡片，展现多种类型的通知。

````jsx
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import moment from 'moment';

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
}];

ReactDOM.render(
  <div style={{ width: 300, textAlign: 'right' }}>
    <NoticeIcon count={10}>
      <NoticeIcon.Tab list={data} title="通知" />
      <NoticeIcon.Tab list={data} title="消息" />
      <NoticeIcon.Tab list={[]} title="待办" />
    </NoticeIcon>
  </div>
, mountNode);
````
