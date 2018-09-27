import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const langMenu = (
      <Menu selectedKeys={[getLocale()]} onClick={this.changLang}>
        <Menu.Item key="zh-CN">中文</Menu.Item>
        <Menu.Item key="en-US">English</Menu.Item>
        <Menu.Item key="pt-BR">Português</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu}>
        <span className={className}>
          <FormattedMessage id="navbar.lang" /> <Icon type="down" />
        </span>
      </Dropdown>
    );
  }
}
