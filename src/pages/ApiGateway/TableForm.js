import React, {Fragment, PureComponent} from 'react';
import {Button, Divider, Input, message, Popconfirm, Select, Table, Tag} from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

const {Option} = Select;

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    console.log("tableform props:",props);
    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
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
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      serviceSeq: '',
      backendType: '',
      url: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

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
    console.log("e.target:",e,e.target);
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
    console.log("e.target:",e,e.target);
    if (target) {
      target[fieldName] = e;
      this.setState({ data: newData });
    }
  }

  validateSeq(target){
    const { data } = this.state;
    console.log("target:",target,"data:",data);
    const foundItem=data.find((obj)=> {
      return obj.serviceSeq === target.serviceSeq && obj.key !== target.key;
    });
    let errorResult=false;
    if (foundItem) {
      errorResult=true;
      message.error(`service seq跟${foundItem.url}的service seq冲突，请重新更改。`);
      return errorResult;
    }
    const endpointItem=data.find((item)=>(item.backendType.toLowerCase()==='endpoint'&&item.key!==target.key));
    if(!endpointItem){
      return errorResult;
    }
    console.log(endpointItem);
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
      if (!target.serviceSeq || !target.backendType || !target.url) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      if(target.backendType !=='in' && target.backendType !=='out' && target.backendType !=='endpoint'){
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
        title: '出／入参',
        dataIndex: 'backendType',
        key: 'backendType',
        width: '20%',
        render: (text, record) => {
          // console.log("----------",text);
          if (record.editable&&(text===null||text.toLowerCase()!=='endpoint')) {
            return (
              <Select
                value={text}
                style={{ width: 90 }}
                onChange={e => this.handleSelectFieldChange(e, 'backendType', record)}
              >
                <Option key='in' value='in'>in</Option>
                <Option key='out' value='out'>out</Option>
                <Option key='endpoint' value='endpoint' disabled>endpoint</Option>
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
        title: '执行顺序',
        dataIndex: 'serviceSeq',
        key: 'serviceSeq',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.serviceSeq - b.serviceSeq,
        width: '20%',
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
        title: 'url',
        dataIndex: 'url',
        key: 'url',
        width: '40%',
        render: (text, record) => {
          const lowerCaseBackendType=record.backendType?record.backendType.toLowerCase():"";
          if (record.editable&&lowerCaseBackendType!=='endpoint') {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'url', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="url or java call"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }

          const lowerCaseBackendType=record.backendType?record.backendType.toLowerCase():"";
          if (lowerCaseBackendType==='endpoint') {
            return (
              <span>
                <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;
    console.log("--------data in TableForm:",data);
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
          htmlType="button"
        >
          新增成员
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
