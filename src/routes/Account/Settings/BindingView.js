import React, { Component, Fragment } from 'react';
import { Icon, List } from 'antd';

export default class BindingView extends Component {
  getData = () => {
    return [
      {
        title: '绑定淘宝',
        description: '当前未绑定淘宝账号',
        actions: [<a>绑定</a>],
        avatar: <Icon type="taobao" className="taobao" />,
      },
      {
        title: '绑定支付宝',
        description: '当前未绑定支付宝账号',
        actions: [<a>绑定</a>],
        avatar: <Icon type="alipay" className="alipay" />,
      },
      {
        title: '绑定钉钉',
        description: '当前未绑定钉钉账号',
        actions: [<a>绑定</a>],
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
