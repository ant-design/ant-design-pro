import React,{PureComponent} from "react";
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
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
        {name: 'envId', title: formatMessage({'id':'app.configuration.env.envId'}), add: true},
        {name: 'envName', title: formatMessage({'id':'app.configuration.env.envName'}), add: true, query: true,},
        {name: 'publicGatewayUrl', title: formatMessage({'id':'app.configuration.env.publicGatewayUrl'}), add: true, detailFlag: 1},
        {name: 'privateGatewayUrl', title: formatMessage({'id':'app.configuration.env.privateGatewayUrl'}), add: true,},
        {name: 'agentUrl', title: formatMessage({'id':'app.configuration.env.agentUrl'}), add: true,},
        {name: 'status', title: formatMessage({'id':'app.configuration.env.status'}), tag:'Common Select', add: true, enumData: statusList, query: true,},
        {name: 'fileServerUrl', title: formatMessage({'id':'app.configuration.env.fileServerUrl'}), add: true,},
        {name: 'ifSelected', title: formatMessage({'id':'app.configuration.env.ifSelected'}), tag:'commonSelect', add: true,enumData: selectList},
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

