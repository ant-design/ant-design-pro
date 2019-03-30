import SelectLang from '@/components/SelectLang';
import { MenuDataItem } from '@/components/SiderMenu';
import { ConnectProps, ConnectState } from '@/models/connect';
import getPageTitle from '@/utils/getPageTitle';
import { GlobalFooter } from 'ant-design-pro';
import { Icon } from 'antd';
import { connect } from 'dva';
import React, { Component, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
  navTheme: string;
}

class UserLayout extends Component<UserLayoutProps> {
  componentDidMount() {
    const { dispatch, route } = this.props;
    const { routes, authority } = route!;
    dispatch!({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const { children, location, breadcrumbNameMap } = this.props;
    return (
      <DocumentTitle title={getPageTitle(location!.pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div>
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }: ConnectState) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
