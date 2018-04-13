import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
import BasicLayout from './BasicLayout';
import AppMenu from '../components/_utils/AppMenu';
/**
 * 根据菜单取得重定向地址.
 */

const getRedirectData = menuData => {
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
  menuData.forEach(getRedirect);
  return redirectData;
};

class LoadingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.redirectData = getRedirectData(this.props.menuData);
    this.state = {
      loading: true,
      isMobile: false,
    };
  }

  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
    const urlParams = new URL(window.location.href);
    const settingString = urlParams.searchParams.get('setting');
    if (settingString) {
      const setting = {};
      settingString.split(';').forEach(keyValue => {
        const [key, value] = keyValue.split(':');
        setting[key] = value;
      });
      this.props.dispatch({
        type: 'setting/changeSetting',
        payload: setting,
      });
    }
    this.hideLoading();
  }

  hideLoading() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { menuData } = this.props;
    if (this.state.loading) {
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
        isMobile={this.state.isMobile}
        menuData={menuData}
        redirectData={this.redirectData}
        {...this.props}
      />
    );
  }
}

export default connect()(AppMenu(LoadingPage));
