import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { Spin,Alert } from 'antd';
import styles from './Login.less';
import { setAllEnumData } from '@/utils/masterData';
import { getPageQuery } from '@/utils/utils';
import {flatToMenuTree} from '../UserManager/userUtil'


const timeout=400;

@connect(({ loadingModel, loading }) => ({
  loadingModel,
  submitting: loading.effects['loadingModel/getMenuData'],
}))
class LoadingPage extends Component {

  state={
    secondsElapsed: 0,
  }

  componentDidMount() {
    setAllEnumData();
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'loadingModel/getMenuData',
    });
    this.interval = setInterval(() => this.monitor(), timeout);

  }

  monitor=()=>{
    const allEnumStr=localStorage.getItem('allEnum');
    const privileges=localStorage.getItem('antd-pro-format-privileges');
    if (allEnumStr&&privileges) {
      console.log("already get data")
      this.redirectPage();
    }
    else {
      const {secondsElapsed} = this.state;
      if (secondsElapsed > 10) {
        clearInterval(this.interval);
        this.redirectPage();
      } else {
        this.setState((prevState) => ({
          secondsElapsed: prevState.secondsElapsed + timeout / 1000,
        }));
      }
    }
  }

  redirectPage=()=>{

    clearInterval(this.interval);
    const urlParams = new URL(window.location.href);
    const params = getPageQuery();

    console.log(urlParams);
    let { redirect } = params;
    if (redirect) {
      const redirectUrlParams = new URL(redirect);
      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        redirect = null;
      }
    }
    console.log(redirect);
    router.replace(redirect||"/");
    // router.push(redirect||"/");
    // router.replace
  }


  render() {
    const { loading } = this.props;
    const { secondsElapsed } = this.state;
    return (
      <div className={styles.main}>
        <Spin tip="Loading...">
          <Alert
            message="Loading base data..."
            description={`${secondsElapsed} second`}
            type="info"
          />
        </Spin>
      </div>
    );
  }
}

export default LoadingPage;
