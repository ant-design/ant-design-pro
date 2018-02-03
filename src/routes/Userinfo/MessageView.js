import React, { Component, Fragment } from 'react';
import { Switch } from 'antd';
import MessageViewItem from './ItemView';

const Action = <Switch defaultChecked />;

export default class MessageView extends Component {
  render() {
    return (
      <Fragment>
        <MessageViewItem
          title="消息通知"
          subTitle="其他用户的消息将以站内信的形式通知"
          action={Action}
        />
        <MessageViewItem
          title="系统消息"
          subTitle="系统消息将以站内信的形式通知"
          action={Action}
        />
        <MessageViewItem
          title="待办通知"
          subTitle="待办事项将以站内信的形式通知"
          action={Action}
        />
      </Fragment>
    );
  }
}
