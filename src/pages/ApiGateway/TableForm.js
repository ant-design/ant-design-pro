import React, {Fragment, PureComponent} from 'react';
import {Button, Divider, Input, message, Popconfirm, Select, Table, Tag,Row,Col,Icon} from 'antd';
import { connect } from 'dva';
import isEqual from 'lodash/isEqual';
import styles from './style.less';
import AdapterSelectView from './AdapterSelectView';
import AdapterAttrTableForm from './AdapterAttrTableForm';
import constants from '@/utils/constUtil';

const {CALL_POINT} = constants;

const {Option} = Select;


@connect(({ adapterModel }) => ({
  adapterModel,
}))
class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  originData={}

  constructor(props) {
    super(props);
    // console.log("tableform props:",props);
    this.originData=props.value;
    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // console.log("----toggleEditable000:",nextProps.value, preState.value);
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    // console.log("----toggleEditable111:");
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      // console.log("----toggleEditable:",newData);
      this.setState({ data: newData });

      if (target.editable) {
        const {onChange} = this.props;
        if (onChange) {
          onChange(newData);// 保存editable=true的状态，提交的时候判断
        }
      }
      // console.log("----toggleEditable333:",this.state.data);
    }
  };

  newMember = (backendType) => {
    const { data } = this.state;
    let maxSeqForIn=0;
    let maxSeqForOut=0;
    let seqForCall=1;
    data.forEach(item=>{
      if(item.backendType==="in"){
        if(parseInt(item.serviceSeq,10)>maxSeqForIn){
          maxSeqForIn=parseInt(item.serviceSeq,10);
        }
      }
      else if(item.backendType==="out"){
        if(parseInt(item.serviceSeq,10)>maxSeqForOut){
          maxSeqForOut=parseInt(item.serviceSeq,10);
        }
      }
      else{
        seqForCall=parseInt(item.serviceSeq,10);
      }
    });

    const newData=data.map(item=>{
      const newItem={...item};
      if(backendType==="in"){
        if(item.backendType==="out"){
          newItem.serviceSeq+=1;
        }
        else if(item.backendType===CALL_POINT){
          newItem.serviceSeq+=1;
        }
      }
      return newItem;
    });

    let serviceSeq=1;
    if(backendType==='in'){
      serviceSeq=maxSeqForIn+1;
    }
    else if(backendType==='out'){
      serviceSeq=maxSeqForOut>0?maxSeqForOut+1:seqForCall+1;
    }

    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      serviceSeq,
      backendType,
      url: '',
      reqPath: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  expandedRowRender = (record) => {
    const data=record.adapterAttrs;
    console.log("---",record,data);
    const keyData= data?data.map((item,index)=>({...item,key:index})):[];
    const keyRecord={...record,adapterAttrs:keyData};

    return record.backendType&&record.backendType.toLowerCase()!==CALL_POINT?(
      <AdapterAttrTableForm
        record={keyRecord}
        onMyChange={(adapterAttrs)=>this.adapterAttrChange(record,adapterAttrs)}
        dataSource={keyData}
      />
    ):(<span>Call endpoint do not need to configure properties</span>);
  };


  adapterAttrChange=(record,adapterAttrs)=>{
    console.log("-------adapterAttrChange")
    const {key}=record;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    target.adapterAttrs=adapterAttrs;
    this.setState({ data: newData });
    console.log("-------adapterAttrChange1",newData);
    const { onChange } = this.props;
    if(onChange){
      onChange(newData);
    }
  }


  handleFieldChange(e, fieldName, record) {
    const {key}=record;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    // console.log("e.target:",e,e.target);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  handleSelectFieldChange(e, fieldName, record) {
    const {key}=record;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    // console.log("e.target:",e,e.target);
    if (target) {
      target[fieldName] = e;
      this.setState({ data: newData });
    }
  }


  handleAdapterFieldChange(e, adapterSpecName, record) {
    const {key}=record;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      const originTarget=this.originData.find(item=>item.key===record.key&&e===item.adapterSpecId);// 获取数据库中的数据
      const originTargetAttr=originTarget?originTarget.adapterAttrs:[];
      console.log("===== origin in handleAdapterFieldChange:",record.key,originTarget,originTargetAttr)
      target.adapterSpecId = e;
      target.adapterSpecName = adapterSpecName;
      if(originTargetAttr.length>0){
        target.adapterAttrs=originTargetAttr;// 如果切换到数据库中的adatper，则还原adapter属性为数据库的数据
        this.setState({ data: newData });
        console.log("=====in changeAdapter:",record.key,originTarget,originTargetAttr)
      }
      else{
        const payload={
          "tableName": "adapter_spec",
          "id": target.adapterSpecId,
        }

        const { dispatch } = this.props;
        console.log("----newData in callback in changeAdapter.");
        dispatch({
          type: 'adapterModel/detail',
          payload,
          callback:(resp)=>{
            if(resp){
              const {attrSpecs}=resp;
              const adapterAttrs=attrSpecs?attrSpecs.map(item=>({
                "backendId": target.backendId,
                "attrSpecId": item.attrSpecId,
                "attrValue": item.defaultValue||'',
                "attrSpecCode": item.attrSpecCode,
                "attrSpecName": item.attrSpecName,
              })):[];
              target.adapterAttrs=adapterAttrs;
              this.setState({ data: newData });
              console.log("----newData in callback in changeAdapter:",newData);
            }
          }
        });
      }

    }
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  validateSeq(target){
    const { data } = this.state;
    // console.log("target:",target,"data:",data);
    let errorResult=false;
    if(target.serviceSeq<=0){
      errorResult=true;
      message.error(`service seq必须大于0，请重新更改。`);
      return errorResult;
    }
    const foundItem=data.find((obj)=> {
      return obj.serviceSeq === target.serviceSeq && obj.key !== target.key;
    });
    if (foundItem) {
      errorResult=true;
      message.error(`service seq跟${foundItem.url}的service seq冲突，请重新更改。`);
      return errorResult;
    }
    const endpointItem=data.find((item)=>(item.backendType.toLowerCase()===CALL_POINT&&item.key!==target.key));
    if(!endpointItem){
      return errorResult;
    }
    // console.log(endpointItem);
    const {serviceSeq} = endpointItem;
    if(target.backendType.toLowerCase()==='out'&&target.serviceSeq<=serviceSeq){
      errorResult=true;
      message.error(`out类型的service seq必须大于${serviceSeq}，请重新更改。`);
      return errorResult;
    }
    if(target.backendType.toLowerCase()==='in'&&target.serviceSeq>=serviceSeq){
      errorResult=true;
      message.error(`in类型的 seq必须小于${serviceSeq}，请重新更改。`);
      return errorResult;
    }
    return errorResult;
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.serviceSeq || (target.backendType !==CALL_POINT&&!target.adapterSpecId)) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      if(target.backendType !=='in' && target.backendType !=='out' && target.backendType !==CALL_POINT){
        message.error(`不能输入${target.backendType}只能输入in 或者 out。`);
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const errorResult=this.validateSeq(target);
      if(errorResult){
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
    const {onChange} = this.props;
    if (onChange) {
      onChange(newData);// 保存editable=true的状态，提交的时候判断
    }
  }


  render() {
/*
    <Input
      value={text}
      autoFocus
      onChange={e => this.handleFieldChange(e, 'backendType', record)}
      onKeyPress={e => this.handleKeyPress(e, record.key)}
      placeholder="backendType"
    />
    */
    const columns = [
      {
        title: 'in／out',
        dataIndex: 'backendType',
        key: 'backendType',
        // width: '10%',
        render: (text, record) => {
          // console.log("----------",text);
          if (record.editable&&(text===null||text.toLowerCase()!==CALL_POINT)) {
            return (
              <Select
                value={text}
                style={{ width: 90 }}
                onChange={e => this.handleSelectFieldChange(e, 'backendType', record)}
              >
                <Option key='in' value='in'>in</Option>
                <Option key='out' value='out'>out</Option>
                <Option key={CALL_POINT} value={CALL_POINT} disabled>{CALL_POINT}</Option>
              </Select>
            );
          }
          /* eslint-disable no-nested-ternary */
          if (text){
            const color = text&&text.length !== 2 ? text&&text.length === 3 ? 'green' : 'volcano' : 'geekblue';
            return <Tag color={color} key={text}>&nbsp;&nbsp;{text.toUpperCase()}&nbsp;&nbsp;</Tag>;
          }
            return <span>&nbsp;</span>
        },
      },
      {
        title: 'Order Seq',
        dataIndex: 'serviceSeq',
        key: 'serviceSeq',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.serviceSeq - b.serviceSeq,
        // width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'serviceSeq', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="service seq"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Adapter',
        dataIndex: 'adapterSpecId',
        key: 'adapterSpecId',
        // width: '50%',
        render: (text, record) => {
          // console.log("----------",text);
          if (record.editable&&(text===null||record.backendType.toLowerCase()!==CALL_POINT)) {
            return (
              <AdapterSelectView
                value={text}
                record={record}
                style={{ width: 300 }}
                onMyChange={(e,adapterSpecName) => this.handleAdapterFieldChange(e, adapterSpecName,record)}
              />

            );
          }
          /* eslint-disable no-nested-ternary */
          if (text){
            const {adapterSpecName}=record
            return adapterSpecName;
          }
          return <span>None</span>
        },
      },
      // {
      //   title: 'url',
      //   dataIndex: 'url',
      //   key: 'url',
      //   width: '30%',
      //   render: (text, record) => {
      //     const lowerCaseBackendType=record.backendType?record.backendType.toLowerCase():"";
      //     if (record.editable&&lowerCaseBackendType!==CALL_POINT) {
      //       return (
      //         <Input
      //           value={text}
      //           onChange={e => this.handleFieldChange(e, 'url', record)}
      //           onKeyPress={e => this.handleKeyPress(e, record.key)}
      //           placeholder="url or java call"
      //         />
      //       );
      //     }
      //     return text;
      //   },
      // },
      // {
      //   title: 'Request Path',
      //   dataIndex: 'reqPath',
      //   key: 'reqPath',
      //   width: '30%',
      //   render: (text, record) => {
      //     const lowerCaseBackendType=record.backendType?record.backendType.toLowerCase():"";
      //     if (record.editable&&lowerCaseBackendType!==CALL_POINT) {
      //       return (
      //         <Input
      //           value={text}
      //           onChange={e => this.handleFieldChange(e, 'reqPath', record)}
      //           onKeyPress={e => this.handleKeyPress(e, record.key)}
      //           placeholder="request path or java call"
      //         />
      //       );
      //     }
      //     return text;
      //   },
      // },
      {
        title: 'action',
        key: 'action',
        // width: '20%',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>Add</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Do you remove？" onConfirm={() => this.remove(record.key)}>
                    <a>Remove</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Hold</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>Cancel</a>
              </span>
            );
          }

          const lowerCaseBackendType=record.backendType?record.backendType.toLowerCase():"";
          if (lowerCaseBackendType===CALL_POINT) {
            return (
              <span>
                <a onClick={e => this.toggleEditable(e, record.key)}>Edit</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>Edit</a>
              <Divider type="vertical" />
              <Popconfirm title="Do you remove？" onConfirm={() => this.remove(record.key)}>
                <a>Remove</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;
    // console.log("--------data in TableForm:",data);
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          defaultExpandAllRows
          expandedRowRender={(record)=>this.expandedRowRender(record)}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Row gutter={16}>
          <Col
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={12}
            style={{ height: 50 }}
          >
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={()=>this.newMember('in')}
              icon="plus-circle"
              htmlType="button"
            >
              Add Adapter (in)
            </Button>
          </Col>
          <Col
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={12}
            style={{ height: 50 }}
          >
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={()=>this.newMember('out')}
              icon="plus-square"
              htmlType="button"
            >
              Add Adapter (out)
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default TableForm;
