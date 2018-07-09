import React, { Component, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { List } from 'antd';
// import { getTimeDistance } from '../../../utils/utils';

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

class SecurityView extends Component {
  getData = () => {
    const { intl } = this.props;
    return [
      {
        title: intl.formatMessage({ id: 'app.settings.security.password' }, {}),
        description: (
          <Fragment>
            {' '}
            {intl.formatMessage({ id: 'app.settings.security.password-description' }, {})}：{
              passwordStrength.strong
            }
          </Fragment>
        ),
        actions: [
          <a>
            <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
      {
        title: intl.formatMessage({ id: 'app.settings.security.phone' }, {}),
        description: `${intl.formatMessage(
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
        title: intl.formatMessage({ id: 'app.settings.security.question' }, {}),
        description: intl.formatMessage({ id: 'app.settings.security.question-description' }, {}),
        actions: [
          <a>
            <FormattedMessage id="app.settings.security.set" defaultMessage="Set" />
          </a>,
        ],
      },
      {
        title: intl.formatMessage({ id: 'app.settings.security.email' }, {}),
        description: `${intl.formatMessage(
          { id: 'app.settings.security.email-description' },
          {}
        )}：ant***sign.com`,
        actions: [
          <a>
            <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
      {
        title: intl.formatMessage({ id: 'app.settings.security.mfa' }, {}),
        description: intl.formatMessage({ id: 'app.settings.security.mfa-description' }, {}),
        actions: [
          <a>
            <FormattedMessage id="app.settings.security.bind" defaultMessage="Bind" />
          </a>,
        ],
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
export default injectIntl(SecurityView);
