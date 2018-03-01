import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import BaseMeun, { getMeunMatcheys } from './BaseMeun';
import { urlToList } from '../utils/pathTools';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    return urlToList(pathname)
      .map((item) => {
        return getMeunMatcheys(this.flatMenuKeys, item)[0];
      })
      .filter(item => item);
  }
  isMainMenu = (key) => {
    return this.menus.some(
      item =>
        key && (item.key === key || item.path === key),
    );
  }
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
  render() {
    const { logo, collapsed, onCollapse, theme } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={`${styles.sider} ${theme === 'ligth' ? styles.ligth : ''}`}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <BaseMeun
          {...this.props}
          key="Menu"
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}
