import React, { Component, Fragment } from 'react';
import SafeViewItem from './ItemView';

export default class SafeView extends Component {
  getPasswordCheck = (type) => {
    switch (type) {
      case 'strong':
        return (
          <Fragment>
            当前密码强度：<font className="strong">强</font>
          </Fragment>
        );

      case 'medium':
        return (
          <Fragment>
            当前密码强度：<font className="medium">中</font>
          </Fragment>
        );

      default:
        return (
          <Fragment>
            当前密码强度：<font className="weak">弱</font>
          </Fragment>
        );
    }
  };
  render() {
    return (
      <Fragment>
        <SafeViewItem
          title="账户密码"
          subTitle={this.getPasswordCheck('strong')}
          action="修改"
        />
        <SafeViewItem
          title="密保手机"
          subTitle="已绑定手机：138****8293"
          action="修改"
        />
        <SafeViewItem
          title="密保问题"
          subTitle="未设置密保问题，密保问题可有效保护账户安全"
          action="设置"
        />
        <SafeViewItem
          title="备用邮箱"
          subTitle="已绑定邮箱：ant***sign.com"
          action="修改"
        />
        <SafeViewItem
          title="MFA 设备"
          subTitle="未绑定 MFA 设备，绑定后，可以进行二次确认"
          action="绑定"
        />
      </Fragment>
    );
  }
}
