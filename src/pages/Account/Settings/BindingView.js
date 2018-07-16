import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Icon, List } from 'antd';

class BindingView extends Component {
  getData = () => {
    return [
      {
        title: formatMessage({ id: 'app.settings.binding.taobao' }, {}),
        description: formatMessage({ id: 'app.settings.binding.taobao-description' }, {}),
        actions: [
          <a>
            <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
          </a>,
        ],
        avatar: <Icon type="taobao" className="taobao" />,
      },
      {
        title: formatMessage({ id: 'app.settings.binding.alipay' }, {}),
        description: formatMessage({ id: 'app.settings.binding.alipay-description' }, {}),
        actions: [
          <a>
            <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
          </a>,
        ],
        avatar: <Icon type="alipay" className="alipay" />,
      },
      {
        title: formatMessage({ id: 'app.settings.binding.dingding' }, {}),
        description: formatMessage({ id: 'app.settings.binding.dingding-description' }, {}),
        actions: [
          <a>
            <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
          </a>,
        ],
        avatar: <Icon type="dingding" className="dingding" />,
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
                avatar={item.avatar}
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
export default BindingView;
