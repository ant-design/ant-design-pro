import React, { Component, Fragment } from 'react';
import MessageViewItem from './ItemView';

export default class MessageView extends Component {
  render() {
    return (
      <Fragment>
        <MessageViewItem
          title="消息通知"
          subTitle="其他用户的消息将以站内信的形式通知"
          action="绑定"
        />
        <MessageViewItem
          title="系统消息"
          subTitle="系统消息将以站内信的形式通知"
          action="绑定"
        />
        <MessageViewItem
          title="待办通知"
          subTitle="待办事项将以站内信的形式通知"
          action="绑定"
        />
      </Fragment>
    );
  }
}
