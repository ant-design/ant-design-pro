import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Icon, List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'accountandsettings.binding.taobao' }, {}),
      description: formatMessage({ id: 'accountandsettings.binding.taobao-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="taobao" className="taobao" />,
    },
    {
      title: formatMessage({ id: 'accountandsettings.binding.alipay' }, {}),
      description: formatMessage({ id: 'accountandsettings.binding.alipay-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="alipay" className="alipay" />,
    },
    {
      title: formatMessage({ id: 'accountandsettings.binding.dingding' }, {}),
      description: formatMessage({ id: 'accountandsettings.binding.dingding-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="accountandsettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="dingding" className="dingding" />,
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
