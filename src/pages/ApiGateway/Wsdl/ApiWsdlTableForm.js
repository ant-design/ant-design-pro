import React, {Fragment, PureComponent} from 'react';
import { Divider, Input, message, Popconfirm, Table} from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';
import {getUserId} from "../../../utils/authority";
import constants from '@/utils/constUtil';

import SelectView from '../SelectView';
import OrgSelectView from '../OrgSelectView';
import Ellipsis from '@/components/Ellipsis';


const {CALL_POINT,WS} = constants;

class ApiWsdlTableForm extends PureComponent {
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
    console.log("tog",e,key)
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
    console.log("handleFieldChange",data)
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    // console.log("e.target:",e,newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  handleFieldBlur(e, key, fieldName) {
    e.persist();
    const target = this.getRowByKey(key) || {};
    if(target.editable){
      return;
    }
    console.log("in handleFieldBlur",fieldName);
    const { data } = this.state;
    this.setState({
      loading: true,
    });
    if(fieldName==="remark"){
      setTimeout(() => {
        const {onChange} = this.props;
        if (onChange) {
          onChange(data);
        }
        this.setState({
          loading: false,
        });
      },0);
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

      if (!target.socketTimeout || !target.connectTimeout || !target.url ) {
        message.error('Please fill in the full description.');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      delete target.isNew;
      if(target.editable){
        this.toggleEditable(e, key);
      }
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

  render() {

    const userId = getUserId();

    const actionNameCol = {
      title: 'actionName',
      dataIndex: 'actionName',
      key: 'name',
      width: '10%',
      render: (text) => {
        return text;
      },
    };

    const orgIdCol = {
      title: 'orgId',
      dataIndex: 'orgId',
      key: 'orgId',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <OrgSelectView style={{ width: '100%' }} userId={userId} orgType="0,1" value={text} onChange={e => this.handleSelectFieldChange(e, 'orgId', record)} />
          );
        }
        return  <OrgSelectView style={{ width: '100%' }} userId={userId} orgType="0,1" value={text} isDisable={1} />;
      },
    };
    const socketTimeoutCol = {
      title: 'socketTimeout',
      dataIndex: 'socketTimeout',
      key: 'socketTimeout',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'socketTimeout', record)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder='Socket Timeout'
            />
          );
        }
        return text;
      },
    };

    const connectTimeoutCol = {
      title: 'connectTimeout',
      dataIndex: 'connectTimeout',
      key: 'connectTimeout',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'connectTimeout', record)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder='Connect Timeout'
            />
          );
        }
        return text;
      },
    };

    const urlCol = {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'url', record)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder='Connect Timeout'
            />
          );
        }
        return text;
      },
    };

    const reqPathCol = {
      title: 'reqPath',
      dataIndex: 'reqPath',
      key: 'reqPath',
      width: '10%',
      render: (text, record) => {
        if (record.editable && record.serviceType !== WS.SERVICE_TYPE) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'reqPath', record)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder='Connect Timeout'
            />
          );
        }
        return <Ellipsis length={30} tooltip style={{overflow: "inherit"}}>{text}</Ellipsis>;
      },
    };

    const reqMethodCol = {
      title: 'reqMethod',
      dataIndex: 'reqMethod',
      key: 'reqMethod',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <SelectView javaCode="common" javaKey="req_method" value={text} onChange={e => this.handleSelectFieldChange(e, 'reqMethod', record)} />
          );
        }
        return <SelectView javaCode="common" javaKey="req_method" value={text} isDisable={1} />;
      },
    };

    const serviceTypeCol = {
      title: 'serviceType',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: '10%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <SelectView javaCode="apiServiceBackend" javaKey="service_type" value={text} onChange={e => this.handleSelectFieldChange(e, 'serviceType', record)} />
          );
        }
        return <SelectView javaCode="apiServiceBackend" javaKey="service_type" value={text} isDisable={1} />;
      },
    };

    const actionCol =
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
                  <a onClick={e => this.saveRow(e, record.key)}>Add</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Do you delete this row?？" onConfirm={() => this.remove(record.key)}>
                    <a>Del</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Save</a>
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
              <Popconfirm title="Do you delete this row?" onConfirm={() => this.remove(record.key)}>
                <a>Del</a>
              </Popconfirm>
            </span>
          );
        },
      };

    const { loading, data } = this.state;

    const columns = [];

    columns.push(actionNameCol);
    columns.push(orgIdCol);
    columns.push(socketTimeoutCol);
    columns.push(connectTimeoutCol);
    columns.push(serviceTypeCol);
    columns.push(urlCol);
    columns.push(reqPathCol);
    columns.push(reqMethodCol);
    columns.push(actionCol);

    // console.log("--------data in TableForm:",data);
    // console.log("this.props",this.props.value);
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
      </Fragment>
    );
  }
}

export default ApiWsdlTableForm;
