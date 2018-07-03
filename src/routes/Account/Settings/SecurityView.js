import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: <font className="strong">强</font>,
  medium: <font className="medium">中文</font>,
  weak: <font className="weak">弱</font>,
};

export default class SecurityView extends Component {
  getData = () => {
    return [
      {
        title: '账户密码',
        description: <Fragment> 当前密码强度：{passwordStrength.strong}</Fragment>,
        actions: [<a>修改</a>],
      },
      {
        title: '密保手机',
        description: '已绑定手机：138****8293',
        actions: [<a>修改</a>],
      },
      {
        title: '密保问题',
        description: '未设置密保问题，密保问题可有效保护账户安全',
        actions: [<a>设置</a>],
      },
      {
        title: '备用邮箱',
        description: '已绑定邮箱：ant***sign.com',
        actions: [<a>修改</a>],
      },
      {
        title: 'MFA 设备',
        description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
        actions: [<a>绑定</a>],
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
