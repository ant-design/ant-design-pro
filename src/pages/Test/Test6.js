import { Tabs } from 'antd';
import {PureComponent} from "react";
import {connect} from "dva";
import router from "umi/router";

const { TabPane } = Tabs;


@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))

class Test6 extends PureComponent {

  state = {
    selectKey: -1,
    menuList : []
  };

  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    const apiId = 158;
    /* 获取apiDebug数据 */
    const userId = 4;
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
        const key = records ? parseInt(records[0].userDebugId,10) : null;
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

  onChange = selectKey => {
    this.setState({ selectKey });
  };

  onEdit = (targetKey, action) => {
    console.log("12312312");
    this[action](targetKey);
  };

  add = () => {
    const { menuList } = this.state;
    const selectKey = `newTab`;
    menuList.push({ debugName: 'New Tab',  userDebugId: selectKey });
    this.setState({ menuList, selectKey });
  };

  getTabs = () =>{

    return this.state.menuList.map(pane => (
      <TabPane tab={pane.debugName} key={pane.userDebugId}>
        {pane.debugName}
      </TabPane>
    ));

  }

  render() {
    const {selectKey} = this.state;
    return (
      <Tabs
        defaultActiveKey={selectKey}
        onChange={this.onChange}
        activeKey={selectKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.getTabs()}
      </Tabs>
    );
  }
}

export default Test6;
