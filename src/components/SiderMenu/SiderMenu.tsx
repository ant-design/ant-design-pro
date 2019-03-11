import { Layout } from 'antd';
import classNames from 'classnames';
import * as H from 'history';
import React, { Component, Suspense } from 'react';
import Link from 'umi/link';
import defaultSettings from '../../../config/defaultSettings';
import PageLoading from '../PageLoading';
import styles from './index.less';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;
const { title } = defaultSettings;
let firstMount: boolean = true;

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';

interface SiderMenuProps {
  menuData: any[];
  location?: H.Location;
  flatMenuKeys?: any[];
  logo?: string;
  collapsed: boolean;
  onCollapse: (collapsed: boolean, type?: CollapseType) => void;
  fixSiderbar?: boolean;
  theme?: SiderTheme;
  isMobile: boolean;
}

interface SiderMenuState {
  openKeys: any;
  flatMenuKeysLen?: number;
}

export default class SiderMenu extends Component<SiderMenuProps, SiderMenuState> {
  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }
  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  isMainMenu: (key: string) => boolean = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange: (openKeys: any[]) => void = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
