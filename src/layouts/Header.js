import React, { PureComponent } from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from '../components/GlobalHeader';
import TopNavHeader from '../components/TopNavHeader';
import styles from './Header.less';
import Authorized from '../utils/Authorized';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true,
  };
  componentDidMount() {
    document.getElementById('root').addEventListener('scroll', this.handScroll);
  }
  componentWillUnmount() {
    document
      .getElementById('root')
      .removeEventListener('scroll', this.handScroll);
  }
  getHeadWidth = () => {
    if (
      !this.props.fixedHeader ||
      this.props.layout === 'topmenu' ||
      this.props.fixSiderbar
    ) {
      return '100%';
    }
    if (!this.props.collapsed) {
      return 'calc(100% - 256px)';
    }
    if (this.props.collapsed) {
      return 'calc(100% - 80px)';
    }
  };
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'userCenter') {
      this.props.dispatch(routerRedux.push('/user-profile/user-center'));
      return;
    }
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'userinfo') {
      this.props.dispatch(routerRedux.push('/user-profile/userinfo/base'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };
  handScroll = () => {
    if (!this.props.autoHideHeader) {
      return;
    }
    const { scrollTop } = document.getElementById('root');
    if (!this.ticking) {
      this.ticking = false;
      requestAnimationFrame(() => {
        if (scrollTop > 400 && this.state.visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 400 && !this.state.visible) {
          this.setState({
            visible: true,
          });
        }
        this.ticking = false;
      });
    }
  };
  render() {
    const {
      logo,
      isMobile,
      handleMenuCollapse,
      silderTheme,
      layout,
      fixedHeader,
    } = this.props;
    const isTop = layout === 'topmenu';
    const HeaderDom = this.state.visible ? (
      <Header
        style={{ padding: 0, width: this.getHeadWidth() }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            logo={logo}
            theme={silderTheme}
            mode="horizontal"
            Authorized={Authorized}
            isMobile={isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            logo={logo}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  layout: setting.layout,
  silderTheme: setting.silderTheme,
  fixedHeader: setting.fixedHeader,
  fixSiderbar: setting.fixSiderbar,
  autoHideHeader: setting.autoHideHeader,
}))(HeaderView);
