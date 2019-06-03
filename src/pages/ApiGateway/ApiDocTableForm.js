import React, {Fragment, PureComponent} from 'react';
import {Button, Divider, Input, message, Popconfirm, Table, Tag} from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

class ApiDocTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    // console.log("tableform props:",props);
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
      name: '',
      type: '',
      remark: '',
      parent: '',
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
    // console.log("e.target:",e,e.target);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  // handleSelectFieldChange(e, fieldName, record) {
  //   const {key}=record;
  //   const { data } = this.state;
  //   const newData = data.map(item => ({ ...item }));
  //   const target = this.getRowByKey(key, newData);
  //   // console.log("e.target:",e,e.target);
  //   if (target) {
  //     target[fieldName] = e;
  //     this.setState({ data: newData });
  //   }
  // }

  // validateSeq(target){
  //   return errorResult;
  // }

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
      if (!target.name || !target.type || !target.remark || !target.parent) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      if(target.type !=='integer'
        && target.type !=='string'
        && target.type !=='nan'
        && target.type !=='flow'
        && target.type !=='array'
        && target.type !=='date'){
        message.error(`不能输入${target.type}只能输入各种类型，如string,nan,integer,flow,array,date。`);
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      // const errorResult=this.validateSeq(target);
      // if(errorResult){
      //   e.target.focus();
      //   this.setState({
      //     loading: false,
      //   });
      //   return;
      // }
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
        title: 'Parent Field',
        dataIndex: 'parent',
        key: 'parent',
        width: '20%',
        render: (text,record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'parent', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Parent Field"
              />
            );
          }
          /* eslint-disable no-nested-ternary */
          if (text&&text!=="-"&&text!=="root"){
            const color = 'volcano';
            return <Tag color={color} key={text}>&nbsp;&nbsp;{text}&nbsp;&nbsp;</Tag>;
          }
          return text;
        },
      },
      {
        title: 'Field Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (text,record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'name', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Field Name"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Field Type',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: (text,record) => {
          /* eslint-disable no-nested-ternary */
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'type', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Field Type"
              />
            );
          }
          if(text==="string"){
            return text;
          }
          if (text){
            const color = text&&text.length !== 4 ? text&&text.length === 6 ? 'green' : 'volcano' : 'geekblue';
            return <Tag color={color} key={text}>&nbsp;&nbsp;{text}&nbsp;&nbsp;</Tag>;
          }
          return <span>&nbsp;</span>
        },
      },
      {
        title: 'remark',
        dataIndex: 'remark',
        key: 'remark',
        width: '40%',
        render: (text, record) => {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'remark', record)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="remark"
              />
            );
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
    // console.log("--------data in TableForm:",data);
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
          新增
        </Button>
      </Fragment>
    );
  }
}

export default ApiDocTableForm;
