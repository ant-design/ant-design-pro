import React, { PureComponent } from 'react';
import { Table, Button, Input, message } from 'antd';
import styles from './style.less';

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }
  getRowByKey(key) {
    return this.state.data.filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submit',
          payload: values,
        });
      }
    });
  }
  toggleEditable(e, key) {
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: [...this.state.data] });
    }
  }
  remove(e, key) {
    e.preventDefault();
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }
  newMember = () => {
    const newData = [...this.state.data];
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  }
  handleFieldChange(e, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    const target = this.getRowByKey(key);
    if (!target.workId || !target.name || !target.department) {
      message.error('请填写完整成员信息。');
      return;
    }
    this.toggleEditable(e, key);
    this.props.onChange(this.state.data);
  }
  cancel(e, key) {
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: [...this.state.data] });
  }
  render() {
    const columns = [{
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChange(e, 'name', record.key)}
              placeholder="成员姓名"
            />
          );
        }
        return text;
      },
    }, {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'workId', record.key)}
              placeholder="工号"
            />
          );
        }
        return text;
      },
    }, {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'department', record.key)}
              placeholder="所属部门"
            />
          );
        }
        return text;
      },
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        if (record.editable) {
          if (record.key.indexOf('NEW_TEMP_ID_') >= 0) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <span className="ant-divider" />
                <a onClick={e => this.remove(e, record.key)}>删除</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.key)}>保存</a>
              <span className="ant-divider" />
              <a onClick={e => this.cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
            <span className="ant-divider" />
            <a onClick={e => this.remove(e, record.key)}>删除</a>
          </span>
        );
      },
    }];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={(record) => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 24 }}
          type="dashed"
          size="large"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
      </div>
    );
  }
}
