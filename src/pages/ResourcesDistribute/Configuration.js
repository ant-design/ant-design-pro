import React,{PureComponent} from "react";
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BindDataQueryTable from '../BindDataQueryTable';
import {getItems} from '@/utils/masterData';


@connect(({uniComp}) => ({
  uniComp,
}))

class Configuration extends PureComponent {
  state = {
    selectedRow: {},
    columnSchemas: {},
  }

  // render之前调用接口得到响应结果存在state的list中
  componentWillMount() {
    const statusList = getItems('common', 'status');// 状态
    const selectList = getItems('env', 'ifSelected');// 选择
    const columnSchemas = {
      tableName: 'env',
      key: 'envId',
      name: 'envId',
      columnDetails: [
        {name: 'envId', title: 'Env Id', add: true},
        {name: 'envName', title: 'Env Name', add: true, query: true,},
        {name: 'publicGatewayUrl', title: 'Public Gateway Url', add: true, detailFlag: 1},
        {name: 'privateGatewayUrl', title: 'Private Gateway Url', add: true,},
        {name: 'agentUrl', title: 'Agent Url', add: true,},
        {name: 'status', title: 'Status', tag:'Common Select', add: true, enumData: statusList, query: true,},
        {name: 'fileServerUrl', title: 'File Server Url', add: true,},
        {name: 'ifSelected', title: 'If Selected', tag:'commonSelect', add: true,enumData: selectList},
      ]

    };

    this.setState({columnSchemas});

  }


  handleRef = (ref) => {
    this.child = ref
  }

  render() {

    const {selectedRow, columnSchemas} = this.state;
    console.log(selectedRow);
    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {
                this.setState({selectedRow: record});
              },  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Configuration;

