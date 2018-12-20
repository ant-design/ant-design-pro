import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Switch, List } from 'antd';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'app.settings.open' })}
        unCheckedChildren={formatMessage({ id: 'app.settings.close' })}
        defaultChecked
      />
    );
    return [
      {
        title: '邮件提醒',
        description: '在任务开始和延期时发邮件提醒',
        actions: [Action],
      },
      {
        title: '每天一封邮件',
        description: '每天发一封您当天待办任务',
        actions: [Action],
      },
      {
        title: '其它设置',
        description: '其它设置描述',
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

export default NotificationView;
