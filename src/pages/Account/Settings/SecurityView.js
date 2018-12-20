import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List } from 'antd';
// import { getTimeDistance } from '@/utils/utils';

class SecurityView extends Component {
  getData = () => [
    {
      title: '绑定手机',
      description: `${formatMessage(
        { id: 'app.settings.security.phone-description' },
        {}
      )}：138****8293`,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: '绑定邮箱' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.email-description' },
        {}
      )}：123***@qq.com`,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

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

export default SecurityView;
