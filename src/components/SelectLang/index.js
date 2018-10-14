import React, { PureComponent } from 'react';
import { formatMessage, FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changLang}>
        <Menu.Item key="zh-CN">
          <FormattedMessage id="lang.simplified-chinese" />
        </Menu.Item>
        <Menu.Item key="zh-TW">
          <FormattedMessage id="lang.traditional-chinese" />
        </Menu.Item>
        <Menu.Item key="en-US">
          <FormattedMessage id="lang.english" />
        </Menu.Item>
        <Menu.Item key="pt-BR">
          <FormattedMessage id="lang.portuguese" />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon
          type="global"
          className={classNames(styles.dropDown, className)}
          title={formatMessage({ id: 'navBar.lang' })}
        />
      </Dropdown>
    );
  }
}
