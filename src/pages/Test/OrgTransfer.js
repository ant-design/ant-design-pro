import React, { PureComponent } from 'react';
import { Transfer } from 'antd';
import { connect } from 'dva';


@connect(({ orgModel, loading }) => ({
  orgList: orgModel.orgList,
  loading: loading.models.orgList,
}))

class OrgTransfer extends PureComponent {
  state = {
    targetKeys: [],
    selectedKeys: [],
    oriTargetKeysToOrg:[],
    apiId:0,
  }

  componentDidMount = () => {
    const { dispatch,targetData } = this.props;
    const orgType="0,1";
    dispatch({
      type: 'orgModel/allOrgList',
      payload: {orgType},
    });
    const oriTargetKeys=targetData&&targetData.apiServiceOrgs?targetData.apiServiceOrgs:[];
    this.setState({targetKeys:oriTargetKeys});
  };

  componentWillReceiveProps(nextProps) {
    const {targetData} = this.props;
    const {targetData:nextTargetData} = nextProps;
    if (nextTargetData&&targetData !== nextTargetData) {
      const oriTargetKeysToOrg=nextTargetData&&nextTargetData.apiServiceOrgs?nextTargetData.apiServiceOrgs:[];
      const oriTargetKeys=oriTargetKeysToOrg
        .map(item => item.appkey);
      console.log("---oriTargetKeysToOrg:",oriTargetKeysToOrg,"=======apiid======",nextTargetData.apiId);
      this.setState({targetKeys:oriTargetKeys,oriTargetKeysToOrg,apiId:nextTargetData.apiId});
    }
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
    const {oriTargetKeysToOrg,apiId}=this.state;
    console.log("---oriTargetKeysToOrg:",apiId,oriTargetKeysToOrg);
    const updateApiServiceOrg=[];
    oriTargetKeysToOrg.forEach((item)=>{
      const targetKey=nextTargetKeys.find((value)=>(value===item.appkey));
      console.log("targetKey1:",targetKey);
      if(!targetKey){
        console.log("targetKey2:",targetKey);
        updateApiServiceOrg.push({...item,act:'D'});// 删除
      }
      else{
        updateApiServiceOrg.push(item);// 不改变
      }
    });
    console.log("---updateApiServiceOrg1:",apiId,oriTargetKeysToOrg);
    nextTargetKeys.forEach((value)=>{
      const org=oriTargetKeysToOrg.find((item)=>(item.appkey===value));
      console.log("org1:",org);
      if(!org){
        console.log("org2:",org);
        updateApiServiceOrg.push({apiId,appkey:value,act:'A'});// 新增
      }
    });
    console.log("---updateApiServiceOrg2:",updateApiServiceOrg);
    const {onOrgTransfer}=this.props;
    onOrgTransfer(updateApiServiceOrg);
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  setKey = (record) => {
    return record.appkey;
  };

  render() {
    const { orgList } = this.props;
    const { targetKeys, selectedKeys } = this.state;
    console.log("=====1",targetKeys);
    return (
      <div>
        <Transfer
          showSearch
          rowKey={this.setKey}
          dataSource={orgList}
          titles={['未授权', '已授权']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => `${item.orgName}-${item.appkey}`}
          listStyle={{
            width: 200,
            height: 300,
          }}
        />
      </div>
    );
  }
}

export default OrgTransfer;
