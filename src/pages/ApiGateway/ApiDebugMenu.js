import React, {Component} from 'react';
import router from 'umi/router';
import {message, Tabs, Modal} from 'antd';
import {getUserId} from '@/utils/authority';

import {connect} from "dva";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ApiDebug from "./ApiDebug";

const {TabPane} = Tabs;

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))

class ApiDebugMenu extends Component {

  state = {
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
        const menuList = records.map(item => ({ ...item, userDebugId: `u${item.userDebugId}` }));
        const key = (menuList && menuList.length >0) ? menuList[0].userDebugId : null;
        console.log("----22222---", key);
        this.setState({
          selectKey: key,
          selectedRow: menuList[0],
          menuList
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

  addTag = (menuList,apiService,sign) =>{
    if( sign === 1 || menuList.length === 0 ){

      const userDebugId = 'u0';
      const newData = {
        debugName: '',
        requestBodySample: '',
        urlSample: apiService?apiService.requestUrl:'',
        responseHeaderSample:'',
        responseBodySample:'',
        userDebugId,
        isNew: true,
      };
      menuList.push(newData);
      this.setState({ menuList, newItem:true,selectKey: userDebugId,selectedRow:newData});
    }
  }

  setBaseInfo = resp => {

    const {data} = resp;
    const {menuList} = this.state;
    console.log("setBaseInfo", data);
    this.setState({
      apiService: data
    });
    this.addTag(menuList,data,0);
  }

  onChange = key => {
    console.log("onChange",key);
    const {menuList} = this.state;
    const selectList = menuList.filter(item => key &&  item.userDebugId  === key );
    const selectedRow = selectList[0];
    this.setState({
      selectKey: key,
      selectedRow
    });
  };

  // handleMenuClick = (e) => {
  //   console.log(e);
  //   /* 父组件调用子组件方法 */
  //   // this.child.childClick();
  // };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { menuList,newItem,apiService } = this.state;

    if( newItem ){
      message.error('Now,you have a new item.Please first save,then new item.');
    }else{
      this.addTag(menuList,apiService,1);
    }
  };

  resetMenuList = (id) =>{

    let lastIndex = 0;
    const {menuList,selectKey,apiService} = this.state;
    const targetKey = id;
    console.log("resetMenuList",targetKey,menuList);
    menuList.forEach((pane, i) => {
      if (pane.userDebugId === targetKey) {
        lastIndex = i - 1;
      }
    });

    const panes = menuList.filter(pane => targetKey && pane.userDebugId !== targetKey );
    let selectedRowNew = {};
    let selectKeyNew = selectKey;
    console.log('ddddd-----',lastIndex,panes);
    if (panes.length>0 && selectKey === targetKey) {
      if (selectKey >= 0) {
        selectKeyNew = panes[lastIndex].userDebugId;
        selectedRowNew = panes[lastIndex];
      } else {
        selectKeyNew = panes[0].userDebugId;
        // eslint-disable-next-line prefer-destructuring
        selectedRowNew = panes[0];
      }
    }
    this.setState({ menuList:panes, selectKey:selectKeyNew ,selectedRow:selectedRowNew});
    this.addTag(panes,apiService,0);
  }

  deleteTab = (targetKey) =>{

    const {dispatch} = this.props;
    const payload = {};
    payload.tableName = 'api_user_debug';
    payload.id = targetKey.replace('u','');
    dispatch({
      type: 'uniComp/del',
      payload,
      callback: resp => {
        if (resp.code === '200') {
          message.success('删除成功');
          /* 重新获取列表信息  */
          this.resetMenuList(targetKey);
        }else{
          message.error('删除失败');
        }
      }
    });

  }

  remove = targetKey => {

    Modal.confirm({
      title: 'Delete Api Debug',
      content: 'Are you sure delete this Api Debug？',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => this.deleteTab(targetKey),
    });

  };

  getTabs = () => {

    const {menuList,apiService, selectedRow} = this.state;

    const {location} = this.props;
    const {state} = location;
    const {apiId} = state || {apiId: 105};
    console.log("getMenu",menuList);
    return menuList.map(item =>
      <TabPane key={item.userDebugId} tab={item.debugName} closable={!item.isNew}>
        <ApiDebug
          apiId={apiId}
          selectedRow={selectedRow}
          apiService={apiService}
          onRef={this.onRef}
          onApiDebug={this.handelMenu}
        />
      </TabPane>
    );
  };

  onRef = (ref) => {
    this.child = ref;
  }

  handelMenu = (menuList,selectKey,selectedRow,sign) => {

    console.log('---handelMenu＝＝＝＝3:', menuList);
    if (menuList) {
      if (sign !== '') {// 删除
        console.log(selectKey);
        this.resetMenuList(selectKey);
      } else {
        this.setState({menuList, selectKey, newItem: false, selectedRow});
      }
    } else {
      this.setState({menuList: null, selectKey: null, newItem: false, selectedRow: null});
    }

  }

  render() {

    const {selectKey} = this.state;
    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{height: '50px'}}
        title="Api Debug"
      >
        <Tabs
          tabPosition="left"
          defaultActiveKey={selectKey}
          onChange={this.onChange}
          activeKey={selectKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.getTabs()}
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default ApiDebugMenu;
