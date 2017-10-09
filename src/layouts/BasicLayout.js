import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import styles from './BasicLayout.less';
import HeaderSearch from '../components/HeaderSearch';
import NoticeIcon from '../components/NoticeIcon';
import GlobalFooter from '../components/GlobalFooter';
import { getNavData } from '../common/nav';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
  }
  constructor(props) {
    super(props);
    // 把一级 Layout 的 children 作为菜单项
    this.menus = getNavData().reduce((arr, current) => arr.concat(current.children), []);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  getChildContext() {
    const { routes, params } = this.props;
    return { routes, params };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch(routerRedux.push('/user/login'));
    }
  }
  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    return currentMenuSelectedKeys;
  }
  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }
  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      const itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key || item.path}>
          <Link to={itemPath}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
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
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          processing: 'blue',
          urgent: 'red',
          doing: 'yellow',
        })[newNotice.status];
        newNotice.extra = <Tag color={`${color}-inverse`}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  handleOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    });
  }
  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  }
  render() {
    const { children, currentUser, collapsed, fetchingNotices } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );

    const noticeData = this.getNoticeData();

    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={80}
            breakpoint="md"
            onCollapse={this.onCollapse}
            style={{ minHeight: '100vh' }}
            width={256}
          >
            <div className={styles.logo}>
              <Link to="/">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/osjtaBtmmQzWRvMbcKeb.svg" alt="logo" />
                <h1>Ant Design Pro</h1>
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              {...menuProps}
              onOpenChange={this.handleOpenChange}
              selectedKeys={this.getCurrentMenuSelectedKeys()}
              style={{ margin: '24px 0', width: '100%' }}
              inlineIndent={32}
            >
              {this.getNavMenuItems(this.menus)}
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.right}>
                <HeaderSearch
                  className={`${styles.action} ${styles.search}`}
                  placeholder="站内搜索"
                  dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                  onSearch={(value) => {
                    console.log('input', value); // eslint-disable-line
                  }}
                  onPressEnter={(value) => {
                    console.log('enter', value); // eslint-disable-line
                  }}
                />
                <NoticeIcon
                  className={styles.action}
                  count={currentUser.notifyCount}
                  onItemClick={(item, tabProps) => {
                    console.log(item, tabProps); // eslint-disable-line
                  }}
                  onClear={this.handleNoticeClear}
                  onPopupVisibleChange={this.handleNoticeVisibleChange}
                  loading={fetchingNotices}
                  popupAlign={{ offset: [20, -16] }}
                >
                  <NoticeIcon.Tab list={noticeData['通知']} title="通知" />
                  <NoticeIcon.Tab list={noticeData['消息']} title="消息" />
                  <NoticeIcon.Tab list={noticeData['待办']} title="待办" />
                </NoticeIcon>
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    {currentUser.name}
                  </span>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              {children}
              <GlobalFooter
                links={[{
                  title: '帮助',
                  href: '',
                }, {
                  title: '隐私',
                  href: '',
                }, {
                  title: '条款',
                  href: '',
                  blankTarget: true,
                }]}
                copyright={<div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>}
              />
            </Content>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
}))(BasicLayout);
