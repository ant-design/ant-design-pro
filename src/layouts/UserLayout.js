import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
  }
  getChildContext() {
    const { routes, params } = this.props;
    return { routes, params };
  }
  getPageTitle() {
    const { routes } = this.props;
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      if (routes[i].breadcrumbName) {
        return `${routes[i].breadcrumbName} - Ant Design Pro`;
      }
    }
    return 'Ant Design Pro';
  }
  render() {
    const { children } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <p className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</p>
          </div>
          {children}
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
