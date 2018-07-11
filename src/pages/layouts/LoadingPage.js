import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import BasicLayout from './BasicLayout';
import { getMenuData } from '../../common/menu';
import { getRouterData } from '../../common/router';
/**
 * 根据菜单取得重定向地址.
 */

const MenuData = getMenuData();
const routerData = getRouterData({});
const getRedirectData = () => {
  const redirectData = [];
  const getRedirect = item => {
    if (item && item.children) {
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `${item.path}`,
          to: `${item.children[0].path}`,
        });
        item.children.forEach(children => {
          getRedirect(children);
        });
      }
    }
  };
  MenuData.forEach(getRedirect);
  return redirectData;
};
const redirectData = getRedirectData();

class LoadingPage extends PureComponent {
  state = {
    loading: true,
    isMobile: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    dispatch({
      type: 'user/fetchCurrent',
    });
    this.hideLoading();
    this.initSetting();
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  hideLoading() {
    this.setState({
      loading: false,
    });
  }

  /**
   * get setting from url params
   */
  initSetting() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/getSetting',
    });
  }

  render() {
    const { loading, isMobile } = this.state;
    if (loading) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: 'auto',
            paddingTop: 50,
            textAlign: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
    return (
      <BasicLayout
        isMobile={isMobile}
        menuData={MenuData}
        routerData={routerData}
        redirectData={redirectData}
        {...this.props}
      />
    );
  }
}

export default connect()(LoadingPage);
