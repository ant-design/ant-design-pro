import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from '../../index.less';

const AppMenu = WrappedComponent => {
  @connect(state => ({
    global: state.global,
  }))
  class AppMenuInner extends React.Component {
    componentDidMount() {
      if (this.props.global.menuData.length <= 0) {
        this.props.dispatch({
          type: 'global/fetchMenus',
        });
      }
    }

    render() {
      const { menuData, routerData } = this.props.global;
      if (menuData.length <= 0 || routerData.length <= 0) {
        return <Spin size="large" className={styles.globalSpin} />;
      } else {
        return <WrappedComponent {...this.props} menuData={menuData} routerData={routerData} />;
      }
    }
  }

  return AppMenuInner;
};

export default AppMenu;
