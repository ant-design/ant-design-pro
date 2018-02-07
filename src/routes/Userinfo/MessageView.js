import React, { Component, Fragment } from 'react';
import { Switch, List } from 'antd';

const Action = <Switch defaultChecked />;

export default class MessageView extends Component {
  getData = () => {
    return [
      {
        title: '账户密码',
        description: '其他用户的消息将以站内信的形式通知',
        actions: [Action],
      },
      {
        title: '消息通知',
        description: '已绑定手机：138****8293',
        actions: [Action],
      },
      {
        title: '系统消息',
        description: '系统消息将以站内信的形式通知',
        actions: [Action],
      },
      {
        title: '待办通知',
        description: '待办事项将以站内信的形式通知',
        actions: [Action],
      },
    ];
  };
  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}
