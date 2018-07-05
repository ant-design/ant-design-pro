import React, { Component, Fragment } from 'react';
import { Icon, List } from 'antd';

export default class BindingView extends Component {
  getData = () => {
    return [
      {
        title: 'Binding Taobao',
        description: 'Currently unbound Taobao account',
        actions: [<a>Bind</a>],
        avatar: <Icon type="taobao" className="taobao" />,
      },
      {
        title: 'Binding Alipay',
        description: 'Currently unbound Alipay account',
        actions: [<a>Bind</a>],
        avatar: <Icon type="alipay" className="alipay" />,
      },
      {
        title: 'Binding DingTalk',
        description: 'Currently unbound DingTalk account',
        actions: [<a>Bind</a>],
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
