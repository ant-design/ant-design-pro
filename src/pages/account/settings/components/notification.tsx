import { List, Switch } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const notificationAction = (key: string) => (
  <Switch
    key={key}
    checkedChildren="开"
    unCheckedChildren="关"
    defaultChecked
  />
);

const notificationData = [
  {
    key: 'user-message',
    title: '用户消息',
    description: '其他用户的消息将以站内信的形式通知',
    actions: [notificationAction('user-message-switch')],
  },
  {
    key: 'system-message',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
    actions: [notificationAction('system-message-switch')],
  },
  {
    key: 'todo-task',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
    actions: [notificationAction('todo-task-switch')],
  },
];

const NotificationView: React.FC = () => {
  const data = notificationData;
  return (
    <List<Unpacked<typeof data>>
      rowKey="key"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default NotificationView;
