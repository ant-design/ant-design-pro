import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import AccountViewItem from './ItemView';

export default class AccountView extends Component {
  render() {
    return (
      <Fragment>
        <AccountViewItem
          icon={<Icon type="taobao" className="taobao" />}
          title="绑定淘宝"
          subTitle="当前未绑定淘宝账号"
          action="绑定"
        />
        <AccountViewItem
          icon={<Icon type="alipay" className="alipay" />}
          title="绑定支付宝"
          subTitle="当前未绑定支付宝账号"
          action="绑定"
        />
        <AccountViewItem
          icon={<Icon type="dingding" className="dingding" />}
          title="绑定钉钉"
          subTitle="当前未绑定钉钉账号"
          action="绑定"
        />
      </Fragment>
    );
  }
}
