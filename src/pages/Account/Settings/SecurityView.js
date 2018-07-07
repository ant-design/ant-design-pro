import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />Weak
    </font>
  ),
};

export default class SecurityView extends Component {
  getData = () => {
    return [
      {
        title: 'account password',
        description: <Fragment> Current password strength：{passwordStrength.strong}</Fragment>,
        actions: [<a>Modify</a>],
      },
      {
        title: 'Security phone',
        description: 'Bound phone：138****8293',
        actions: [<a>Modify</a>],
      },
      {
        title: 'Security Question',
        description:
          'The security question is not set, and the security policy can effectively protect the account security',
        actions: [<a>Set</a>],
      },
      {
        title: 'Backup Email',
        description: 'Bound Email：ant***sign.com',
        actions: [<a>Modify</a>],
      },
      {
        title: 'MFA Device',
        description: 'Unbound MFA device, after binding, can be confirmed twice',
        actions: [<a>Bind</a>],
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
