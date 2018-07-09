import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Switch, List } from 'antd';

class NotificationView extends Component {
  getData = () => {
    const { intl } = this.props;
    const Action = (
      <Switch
        checkedChildren={intl.formatMessage({ id: 'app.settings.open' }, {})}
        unCheckedChildren={intl.formatMessage({ id: 'app.settings.close' }, {})}
        defaultChecked
      />
    );
    return [
      {
        title: intl.formatMessage({ id: 'app.settings.notification.password' }, {}),
        description: intl.formatMessage(
          { id: 'app.settings.notification.password-description' },
          {}
        ),
        actions: [Action],
      },
      {
        title: intl.formatMessage({ id: 'app.settings.notification.messages' }, {}),
        description: intl.formatMessage(
          { id: 'app.settings.notification.messages-description' },
          {}
        ),
        actions: [Action],
      },
      {
        title: intl.formatMessage({ id: 'app.settings.notification.todo' }, {}),
        description: intl.formatMessage({ id: 'app.settings.notification.todo-description' }, {}),
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
export default injectIntl(NotificationView);
