import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  InputNumber,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  message,
  DatePicker,
  Select,
  Badge,
  Popconfirm,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import styles from '../../../List/TableList.less';
const Authorized = RenderAuthorized(getAuthority());
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['success', 'error'];
const status = ['启用', '禁用'];


const CreateForm = Form.create()(props => {
  const { modalVisible, confirmDirty, form, handleResetPassword, handleConfirmBlur, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleResetPassword(fieldsValue);
    });
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('确认密码不一致!');
    } else {
      callback();
    }
  };

  const confirmBlur = e => {
    const value = e.target.value;
    handleConfirmBlur(value);
  };

  return (
    <Modal
      destroyOnClose
      title="重置密码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }, { validator: validateToNextPassword }],
        })(<Input.Password size="large" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
        {form.getFieldDecorator('confirm', {
          rules: [{ required: true, message: '请输入确认密码' }, { validator: compareToFirstPassword }],
        })(<Input.Password size="large" onBlur={confirmBlur} placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});


@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    selectedRows: [],
    expandForm: false,
    modalVisible: false,
    confirmDirty: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleConfirmBlur = value => {
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleResetPassword = values => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const rows = [];
    selectedRows.forEach(row => {
      rows.push({
        id: row.id,
        password: values.password,
      });
    });
    console.log(rows);
    dispatch({
      type: 'user/modifyPassword',
      payload: rows,
    });
    this.handleModalVisible()
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current - 1,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'user/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  columns = [
    {
      title: '账号',
      dataIndex: 'userName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '管理员',
      dataIndex: 'isSuperAdmin',
      render(val) {
        if (val === true) {
          return <span style={{ color: 'red' }}>是</span>;
        } else {
          return '否';
        }
      },
    },
    {
      title: '角色',
      render: (text, record) => (
        <span>
          {record.roles.map(role => role.roleName)}
        </span>
      ),
    },
    {
      title: '使用状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '注册日期',
      dataIndex: 'addOn',
    },
    {
      title: '登陆日期',
      dataIndex: 'lastLogin',
    },
    {
      title: '修改日期',
      dataIndex: 'editOn',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <Authorized authority={['super_admin', 'user_edit']}>
            <a onClick={() => this.handleEdit(record)}>编辑</a>
            <Divider type="vertical" />
          </Authorized>
          <Authorized authority={['super_admin', 'user_delete']}>
            <Popconfirm
              title="你确定要删除此记录吗?"
              onConfirm={() => this.handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Authorized>
        </Fragment>
      ),
    },
  ];

  handleEdit = record => {
    router.push('/system-management/user/edit/' + record.id);
  };

  handleDelete = record => {
    console.log(record);
    const { dispatch } = this.props;
    dispatch({
      type: 'user/delete',
      payload: record.id,
    });
  };

  handleAdd() {
    router.push('/system-management/user/add');
  };

  handleRoleAuth = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 1) {
      if (selectedRows[0].isSuperAdmin === true) {
        message.error('不能对系统超级管理员进行角色授权!');
      } else {
        router.push('/system-management/user/roleAuth/' + selectedRows[0].id);
      }
    } else {
      message.error('请选择一个用户进行角色授权!');
    }
  };

  handleResetPwd = () => {
    this.handleModalVisible(true);
  };

  disableUserConfirm = () => {
    const that = this;
    Modal.confirm({
      title: '你确定要禁用此账号?',
      content: '禁用账号后，此账号不可登陆系统!',
      onOk() {
        that.disableUser();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  activeUserConfirm = () => {
    const that = this;
    Modal.confirm({
      title: '你确定要激活此账号?',
      content: '激活账号后，此账号可登陆系统!',
      onOk() {
        that.activeUser();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  disableUser = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const rows = [];
    selectedRows.forEach(row => {
      rows.push({
        id: row.id,
      });
    });
    console.log(rows);
    dispatch({
      type: 'user/disable',
      payload: selectedRows,
    });
  };

  activeUser = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const rows = [];
    selectedRows.forEach(row => {
      rows.push({
        id: row.id,
      });
    });
    console.log(rows);
    dispatch({
      type: 'user/active',
      payload: selectedRows,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('userName')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="手机">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button icon="search" type="primary" size="large" htmlType="submit">
                查询
              </Button>
              <Button
                icon="reload"
                type="primary"
                style={{ marginLeft: 8 }}
                size="large"
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a icon="down" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                高级查询 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" labelAlign="right">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('userName')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="管理员">
              {getFieldDecorator('isSuperAdmin')(
                <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                  <Option value="0">正常</Option>
                  <Option value="1">禁用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button icon="search" type="primary" size="large" htmlType="submit">
                查询
              </Button>
              <Button
                icon="reload"
                type="primary"
                style={{ marginLeft: 8 }}
                size="large"
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a icon="down" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  };

  render() {
    const {
      user: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, confirmDirty } = this.state;
    const parentMethods = {
      handleResetPassword: this.handleResetPassword,
      handleConfirmBlur: this.handleConfirmBlur,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Authorized authority={['super_admin', 'user_search']}>
                {this.renderForm()}
              </Authorized>
            </div>
            <div className={styles.tableListOperator}>
              <Authorized authority={['super_admin', 'user_add']}>
                <Button icon="plus" type="primary" size="large" onClick={() => this.handleAdd()}>
                  新增
                </Button>
              </Authorized>
              <Authorized authority={['super_admin', 'user_role_auth']}>
                {selectedRows.length > 0 && (
                  <Button type="primary" size="large" onClick={() => this.handleRoleAuth()}>
                    角色授权
                  </Button>
                )}
              </Authorized>
              <Authorized authority={['super_admin', 'user_reset_pwd']}>
                {selectedRows.length > 0 && (
                  <Button type="primary" size="large" onClick={() => this.handleResetPwd()}>
                    重置密码
                  </Button>
                )}
              </Authorized>
              <Authorized authority={['super_admin', 'user_disable']}>
                {selectedRows.length > 0 && (
                  <Button type="primary" size="large" onClick={() => this.disableUserConfirm()}>
                    禁用
                  </Button>
                )}
              </Authorized>
              <Authorized authority={['super_admin', 'user_active']}>
                {selectedRows.length > 0 && (
                  <Button type="primary" size="large" onClick={() => this.activeUserConfirm()}>
                    激活
                  </Button>
                )}
              </Authorized>
            </div>
            <StandardTable
              bordered
              rowKey="id"
              size="small"
              scroll={{ x: 1200 }}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} confirmDirty={confirmDirty} />
      </PageHeaderWrapper>
    );
  };
}

export default UserList;
