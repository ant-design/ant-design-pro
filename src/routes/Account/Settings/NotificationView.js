import React, { Component, Fragment } from 'react';
import { Switch, List } from 'antd';

const Action = <Switch checkedChildren="Open" unCheckedChildren="Close" defaultChecked />;

export default class NotificationView extends Component {
  getData = () => {
    return [
      {
        title: 'Account Password',
        description: 'Messages from other users will be notified in the form of a station letter',
        actions: [Action],
      },
      {
        title: 'System Information',
        description: 'System messages will be notified in the form of a station letter',
        actions: [Action],
      },
      {
        title: 'To-do Notification',
        description: 'The to-do list will be notified in the form of a letter from the station',
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
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}
