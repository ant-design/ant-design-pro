import React, {Component} from 'react';
import router from 'umi/router';
import {Menu, Button, message} from 'antd';
import {getUserId} from '@/utils/authority';

import {connect} from "dva";
import styles from "../Account/Settings/Info.less";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ApiDebug from "./ApiDebug";

const {Item} = Menu;

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))

class ApiDebugMenu extends Component {

  state = {
    mode: 'inline',
    selectKey: null,
    selectedRow: {},
    apiService: {},
    menuList : [],
    newItem : false
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
    // console.log("getMenu", data);
    // const list = data && data.list ? data.list : [];
    const {menuList} = this.state;
    const selectList = menuList.filter(item => key && key.indexOf(item.userDebugId) !== -1);
    const selectedRow = selectList.shift();
    this.setState({
      selectKey: key,
      selectedRow
    });
  };

  handleMenuClick = (e) => {
    console.log(e);
    /* 父组件调用子组件方法 */
    // this.child.childClick();
  };

  getMenu = () => {

    const {menuList} = this.state;
    console.log("getMenu",menuList);
    return menuList.map(item => <Item key={item.userDebugId} onClick={this.handleMenuClick}>{item.debugName} </Item>);
  };

  newMenu = () => {
    const { menuList,newItem } = this.state;
    if( newItem ){
      message.error('Now,you have a new item.Please first save,then new item.');
    }else{
      const newData = menuList.map(item => ({ ...item }));
      newData.push({
        debugName: '',
        requestBodySample: '',
        urlSample: '',
        userDebugId:``,
        isNew: true,
      });
      this.setState({ menuList: newData, newItem:true });
    }
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

  onRef = (ref) => {
    this.child = ref
  }

  click = (e) => {
    console.log(e);
    this.child.myName();
  }

  handelMenu = (menuList,selectKey) => {
    console.log('---handelMenu＝＝＝＝3:', menuList);
    if(selectKey !== -1){
      /*  删除 */
      this.setState({ menuList ,selectKey});
    }else{
      /* 保存 */
      this.setState({ menuList ,newItem:false});
    }
   
  }

  render() {

    const {location} = this.props;
    const {state} = location;
    const {apiId} = state || {apiId: 105};
    const {mode, selectKey, selectedRow, apiService} = this.state;
    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{ height: '50px' }}
        title="Api Update"
      >
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getMenu()}
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
                onRef={this.onRef}
                onApiDebug={this.handelMenu}
              />
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ApiDebugMenu;
