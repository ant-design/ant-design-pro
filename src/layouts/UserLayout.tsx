import SelectLang from '@/components/SelectLang';
import GlobalFooter from '@/components/GlobalFooter';
import { ConnectProps } from '@/models/connect';
import { Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import { MenuDataItem, getPageTitle, getMenuData } from '@ant-design/pro-layout';

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
    Copyright <Icon type="copyright" /> 2019 蚂蚁金服体验技术部出品
  </Fragment>
);

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
  navTheme: string;
}

class UserLayout extends Component<UserLayoutProps> {
  render() {
    const {
      route = {
        routes: [],
      },
    } = this.props;
    const { routes = [] } = route;
    const { children, location } = this.props;
    const { breadcrumb } = getMenuData(routes, this.props);
    return (
      <DocumentTitle
        title={getPageTitle({
          pathname: location!.pathname,
          breadcrumb,
          formatMessage,
        })}
      >
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

export default UserLayout;
