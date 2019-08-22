import React, {PureComponent} from 'react';
import {Divider,BackTop} from 'antd';
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";
import {flatToTree,} from "./userUtil"


@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Privilege extends PureComponent {

  state={
    selectedRow:undefined,
    modalVisible:false,
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status'); // 状态主数据
    const iconList = getItems('privilege', 'icon');  // 菜单图标祝数据
    iconList.push({javaCode:'privilege',javaKey:'icon',itemCode:'',itemValue:'None Icon'});
    const typeList = getItems('privilege', 'type');  // 菜单类型主数据

    const hideChildrenInMenuList = getItems('privilege', 'hide_children_in_menu'); // 子菜单是否隐藏主数据
    const hideInMenuList = getItems('privilege', 'hide_in_menu');// 菜单是否隐藏主数据

// 表格信息、展现信息、动作信息等
    const columnSchemas = {
      tableName: 'sys_privilege',
      key: 'privilegeId',
      name: 'name',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'privilegeId', title: formatMessage({'id':'app.privilege.sys_privilege.privilegeId'}), add: true, disabledAct:'true', width:110 },
        { name: 'name', title: formatMessage({'id':'app.privilege.sys_privilege.name'}), query: true, add: true, detailFlag:1, showIcon:'icon',formatMessagePrivilege:true},
        { name: 'path', title: formatMessage({'id':'app.privilege.sys_privilege.path'}), query: true, add: true,showLen:22},
        { name: 'parentPrivilegeId', title: formatMessage({'id':'app.privilege.sys_privilege.parentPrivilegeId'}), add: true, tag:'privilegeTreeSelect', detail:false, columnHidden: true,rules:[]},
        {
          name: 'type',
          title: formatMessage({'id':'app.privilege.sys_privilege.type'}),
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: typeList,
        },
        { name: 'roleStr', title: formatMessage({'id':'app.privilege.sys_privilege.roleStr'}), showLen:14, detail:true },
        {
          name: 'icon',
          title: formatMessage({'id':'app.privilege.sys_privilege.icon'}),
          columnHidden: true,
          query: false,
          add: true,
          tag: 'commonSelect',
          enumData: iconList,
          rules:[],
        },
        {
          name: 'hideChildrenInMenu',
          title: formatMessage({'id':'app.privilege.sys_privilege.hideChildrenInMenu'}),
          columnHidden: true,
          query: false,
          add: true,
          tag: 'commonRadio',
          enumData: hideChildrenInMenuList,
          rules:[],
        },
        {
          name: 'hideInMenu',
          title: formatMessage({'id':'app.privilege.sys_privilege.hideInMenu'}),
          columnHidden: true,
          query: false,
          add: true,
          tag: 'commonRadio',
          enumData: hideInMenuList,
          rules:[],
        },
        {
          name: 'status',
          title: formatMessage({'id':'app.privilege.sys_privilege.status'}),
          columnHidden: false,
          query: false,
          add: false,
          tag: 'commonSelect',
          enumData: statusList,
        },
        { name: 'remark', title: formatMessage({'id':'app.privilege.sys_privilege.remark'}),tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ],
      relations:[{
        name:'sysPrivilegeRoles',
        key: 'id',
        title:formatMessage({'id':'app.privilege.sys_privilege.sysPrivilegeRoles'}),
        columnDetails:[{name: 'id',title:formatMessage({'id':'app.privilege.sys_privilege.id'})},
          {name: 'roleId',title:formatMessage({'id':'app.privilege.sys_privilege.roleId'})},
          {name: 'roleName',title:formatMessage({'id':'app.privilege.sys_privilege.roleName'})}]
      }],
    };
    this.setState({columnSchemas});
  }

  // componentDidMount() {
  //   // console.log('============2componentDidMount========');
  //   this.handlePrivilegeSearch();
  // }
  //
  // handlePrivilegeSearch = () => {
  //
  //   const {
  //     dispatch,
  //   } = this.props;
  //
  //   const params = {
  //     tableName:'sys_privilege',
  //     data:{
  //       info:{
  //         pageNo: 1,
  //         pageSize: 999,
  //       }
  //     }
  //   };
  //   dispatch({
  //     type: 'uniComp/list',
  //     payload:params,
  //   });
  // };

  handleRole=()=>{
    const {selectedRow}=this.state;
    // message.success(action);
    if(selectedRow) {
      // message.success(selectedRow.name);
      this.setState({
        modalVisible: true,
      });
    }
  }

  // 轉換list裡面的value
  handleConversionData=(list)=>{
    const newData=[];
    const newList=list.map((item)=>{
      if(item.sysPrivilegeRoles){
        const roleArr=item.sysPrivilegeRoles.map((arr)=>{
          return arr.roleName;
        })
        const roleStr=roleArr.join(',');
        return {...item,roleStr};
      }
      return item;
    });
    if(newList.length>50){
      flatToTree(newList,newData,0);
      // console.log("-----flat to tree---5",newData);
      return newData;
    }
    return newList;
  }

  // // 获取treeselect的数据
  // handleTreeSelectData=(list)=>{
  //   const privilegeTreeDataForSelect=[];
  //   flatToPrivilegeTreeSelect(list,privilegeTreeDataForSelect,0);
  //   return privilegeTreeDataForSelect;
  // }

  handleVisible=(modalVisible)=>{
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({modalVisible});
  }
  
  handleRefreshData=()=>{
    // console.log("-----2222222---5");
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  render() {
    const {modalVisible,selectedRow,columnSchemas}=this.state;
    // const {data:{list}}=this.props;
    // const treeSelectData=[];
    // if(list){
    //   flatToPrivilegeTreeSelect(list,treeSelectData,0);
    // }
    return (
      <PageHeaderWrapper>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          pageSize='999'
          size='small'
          onConversionData={this.handleConversionData}
          onRef={this.handleRef}
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {// console.log(12)}
            };
          }}
        >
          <QueryCommand>
            <Divider type="vertical" />
            <a onClick={() => this.handleRole()}>Role</a>
          </QueryCommand>
        </BindDataQueryTable>
        <RoleTransfer
          title='Grant authorization'
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          onRefreshData={this.handleRefreshData}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          keyName='roleId'
          relationName='sysPrivilegeRoles'
        />
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}
export default Privilege;
