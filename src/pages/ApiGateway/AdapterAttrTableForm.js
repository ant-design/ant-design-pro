import React, {Fragment, PureComponent} from 'react';
import {Divider, Input, message, Table} from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';


class AdapterAttrTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    console.log("AdapterAttrTableForm props:",props.dataSource);
    this.state = {
      data: props.dataSource,
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    console.log("11111",nextProps.dataSource,preState.data)
    const preData=preState.data.map(item=>{
      const {attrSpecId}=item;
      return attrSpecId;
    });
    const nextData=nextProps.dataSource.map(item=>{
      const {attrSpecId}=item;
      return attrSpecId;
    });
    if (isEqual(nextData, preData)) {
      return null;
    }
    console.log("22222")
    return {
      data: nextProps.dataSource,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    const target=(newData || data).find(item => item.key === key);
    return target;
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    console.log("------toggleEditable-1:",data);
    const newAttrData = data.map(item => ({ ...item }));
    console.log("------toggleEditable-0:",newAttrData);
    const oldTarget = newAttrData.find(item => (item.key === key));
    const target = {...oldTarget};
    console.log("------toggleEditable1:",oldTarget,target)
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      newAttrData[key]=target;
      console.log("------toggleEditable2:",target)
      this.setState({ data: newAttrData });
    }
  };


  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
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
      if (!target.attrValue) {
        message.error('Please fill in the complete information.');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onMyChange } = this.props;
      console.log("-------onMyChange in AdatperAtttrTableForm1",this.props)
      if(onMyChange){
        console.log("-------onMyChange in AdatperAtttrTableForm")
        onMyChange(data);
      }
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
        title: 'Attr Spec Name',
        dataIndex: 'attrSpecName',
        key: 'attrSpecName',
        width:'20%',
        render:(text)=>{
          return (<div style={{textAlign:'left',fontWeight: 'bold'}}>{text}:</div>);
        }
      },
      {
        title: 'Attr Value',
        dataIndex: 'attrValue',
        key: 'attrValue',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'attrValue', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Attribute Value of Adapter"
              />
            );
          }
          return (`${text}`);
        },
      },
      {
        title: 'action',
        key: 'action',
        width: '15%',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Hold</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>Cancel</a>
              </span>
            );
          }

          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>Edit</a>
            </span>
          );
        },
      },
    ];
    const { loading, data } = this.state;
    const { record } = this.props;
    const { url,reqPath } = record;
    const reqUrl = `${url}${reqPath}`;
    console.log("reqUrl",record);
    const title = () => reqUrl;
    return (
      <Fragment>
        <Table
          title={title}
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          showHeader={false}
          size='small'
          rowClassName={records => (records.editable ? styles.editable : '')}
        />
      </Fragment>
    );
  }
}

export default AdapterAttrTableForm;
