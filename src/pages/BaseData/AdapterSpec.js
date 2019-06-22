import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

import Authorized from '@/utils/Authorized';
import { getAuth } from '@/utils/authority';

const { check } = Authorized;

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Adapter extends PureComponent {

  state={
    selectedRow:undefined,
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status');// 状态
    const pointTypeList = getItems('adapterSpec', 'point_type');
    const techTypeList = getItems('adapterSpec', 'tech_type');
    const auth=getAuth("adapter_save"); // 获取某个功能权的角色
    const saveAct = check(auth,'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth,'Attr');
// 动作对象
    const actions=saveAct||commandAct?{
      title:'action',
      width:130,
      saveAct,
      commandAct,
      havePermissions:true,
      haveAddPermissions:true,
    }:{havePermissions:false,
      haveAddPermissions:false,};

    const columnSchemas = {
      tableName: 'adapter_spec',
      key: 'id',
      name: 'name',
      relationKey: 'adapterSpecId',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'id', title: 'Adapter ID', columnHidden: true, add: true, disabledAct:'true' },
        { name: 'name', title: 'Adapter Name', sorter: true, query: true, add: true, detailFlag:true },
        {
          name: 'pointType',
          title: 'Point Type',
          columnHidden: false,
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: pointTypeList,
        },
        {
          name: 'techType',
          title: 'Tech Type',
          columnHidden: false,
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: techTypeList,
        },
        { name: 'url', title: 'Adapter URL', showLen:15,query: false, add: true ,rules:[]},
        { name: 'reqPath', title: 'Adapter Path', showLen:15,query: false, add: true ,rules:[]},
        { name: 'code', title: 'Adapter Java Code', showLen:15, query: false, add: true ,rules:[]},
        {
          name: 'status',
          title: 'Status',
          columnHidden: false,
          query: false,
          add: false,
          tag: 'commonSelect',
          enumData: statusList,
        },
        { name: 'remark', title: 'remark',tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ],
      relations:[{
        name:'attrSpecs',
        key: 'attrSpecId',
        title:'Attr Spec List',
        columnDetails:[
          {name: 'attrSpecId',title:'Attr Spec Id'},
          {name: 'attrSpecCode',title:'Code'},
          {name: 'desc',title:'Name'},
          {name: 'defaultValue',title:'Default Value'},
        ]
      }],
      actions,
    };
    this.setState({columnSchemas});
  }

  handleAttr = () => {
    const {selectedRow}=this.state;
    const { id } = selectedRow;
    // router.push(`/apiGateway/apiCreate/${apiId}`);
    router.push({
      pathname: `/baseData/attrSpecFromAdapter`, // 通过url参数传递
      state: {
        // 通过对象传递
        adapterSpecId:id,
        record:selectedRow, // 表格某行的对象数据
      },
    });
  };

  render() {
    const {columnSchemas}=this.state;
    return (
      <PageHeaderWrapper title="Adapter Management" showBreadcrumb>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        >
          <QueryCommand>
            <Divider type="vertical" />
            <a onClick={() => this.handleAttr()}>Attr</a>
          </QueryCommand>
        </BindDataQueryTable>
      </PageHeaderWrapper>
    );
  }
}
export default Adapter;
