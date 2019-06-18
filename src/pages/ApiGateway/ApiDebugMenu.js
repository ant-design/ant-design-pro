import React, {Component, Fragment} from 'react';
import router from 'umi/router';
import {Menu, Icon, Button} from 'antd';
import {getUserId} from '@/utils/authority';

import {connect} from "dva";
import styles from "../Account/Settings/Info.less";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import ApiDebug from "./ApiDebug";

const {Item} = Menu;

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))

class ApiDebugMenu extends Component {
  index = 0;

  state = {
    mode: 'inline',
    selectKey: null,
    selectedRow: {},
    apiService: {},
    menuList : []
  };

  componentWillMount() {

  }

  componentDidMount() {

    const {location, dispatch} = this.props;
    const {state} = location;
    // console.log("location state:",state);
    const {apiId} = state || {apiId: 105};
    /* 获取apiDebug数据 */
    const userId = getUserId();
    const tableName = "api_user_debug";
    const pageSize = 9999;
    const params = {userId, tableName, pageSize, apiId};
    console.log('binddata', params);
    dispatch({
      type: 'uniComp/list',
      payload: params,
      onConversionData: undefined,
      callback: resp => {
        console.log("---123---", resp);
        const {data} = resp;
        const {records} = data;
        const key = records ? records[0].userDebugId.toString() : null;
        console.log("----22222---", key);
        this.setState({
          selectKey: key,
          selectedRow: records[0],
          menuList:records
        });
      }
    });

    /* 获取apiInfo数据 */
    this.getApi(apiId);


  }

  getApi = apiId => {
    const {dispatch} = this.props;
    if (apiId !== -1) {
      const payload = {};
      payload.option = 4;
      payload.range = 1;
      payload.data = {};
      payload.data.info = {};
      payload.data.info.apiId = apiId;
      dispatch({
        type: 'apiCreateModel/apiInfo',
        payload,
        callback: resp => {
          this.setBaseInfo(resp, dispatch);
        },
      });
    } else {
      router.push('/exception/403');
    }
  };

  setBaseInfo = resp => {

    const {data} = resp;
    console.log("setBaseInfo", data);
    this.setState({
      apiService: data
    })
  }

  selectKey = ({key}) => {
    // const {
    //   uniComp: {data}
    // } = this.props;
    // console.log("getmenu", data);
    // const list = data && data.list ? data.list : [];
    const {menuList} = this.state;
    const selectList = menuList.filter(item => key && key.indexOf(item.userDebugId) !== -1);
    const selectedRow = selectList.shift();
    this.setState({
      selectKey: key,
      selectedRow
    });
  };

  getmenu = () => {

    const {menuList} = this.state;
    // const {uniComp} = this.props;
    // const data = uniComp && uniComp.data ? uniComp.data : {};
    // const list = data && data.list ? data.list : [];
    return menuList.map(item => <Item key={item.userDebugId}>{item.debugName} </Item>);
  };

  newMenu = () => {
    const { menuList } = this.state;
    const newData = menuList.map(item => ({ ...item }));
    newData.push({
      debugName: '',
      requestBodySample: '',
      urlSample: '',
      userDebugId:``,
      isNew: true,
    });
    this.index += 1;
    this.setState({ menuList: newData });
  }

  // getRightTitle = () => {
  //   const {selectKey} = this.state;
  //   const {uniComp} = this.props;
  //   const data = uniComp && uniComp.data ? uniComp.data : {};
  //
  //   const list = data && data.list ? data.list : [];
  //   const selectList = list.filter(item => selectKey && selectKey.indexOf(item.userDebugId) !== -1);
  //
  //   if (selectList && selectList.length > 0) {
  //     const selObj = selectList.shift();
  //     return selObj.debugName;
  //   }
  //   return " ";
  // };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const {offsetWidth} = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  render() {

    const {location} = this.props;
    const {state} = location;
    const {apiId} = state || {apiId: 105};
    const {mode, selectKey, selectedRow, apiService} = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMenu}
              icon="plus"
              htmlType="button"
            >
              NEW
            </Button>
          </div>
          <div className={styles.right}>
            <ApiDebug
              apiId={apiId}
              selectedRow={selectedRow}
              apiService={apiService}
            />
          </div>
        </div>
      </GridContent>
    );
  }
}

export default ApiDebugMenu;
