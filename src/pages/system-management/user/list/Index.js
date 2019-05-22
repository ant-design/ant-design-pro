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
  DatePicker,
  Select,
  Badge,
  Popconfirm,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['success', 'error'];
const status = ['正常', '禁用'];

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    selectedRows: [],
    expandForm: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
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
      width: 150,
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '管理员',
      dataIndex: 'isSuperAdmin',
      render(val) {
        if (val === 1) {
          return <span style={{ color: 'green' }}>是</span>;
        } else {
          return '否';
        }
      },
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
        if (val === 0) {
          return <span style={{ color: 'blue' }}>{status[val]}</span>;
        }
        if (val === 1) {
          return <span style={{ color: 'red' }}>{status[val]}</span>;
        }
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
          <a onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除此记录吗?"
            onConfirm={() => this.handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  handleEdit = record => {
    console.log(record);
    router.push('/settings/user/edit/' + record.id);
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
    console.log('handleAdd...');
    router.push('/settings/user/add');
  }

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

  handleMenuClick = e => {
    console.log(e);
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'roleAuth':
        break;
      case 'resetPassword':
        break;
      case 'disable':
        this.disableUserConfirm();
        break;
      case 'active':
        break;
      default:
        break;
    }
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
              {getFieldDecorator('username')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('realname')(<Input placeholder="请输入" size="large" />)}
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
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" labelAlign="right">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('username')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('realname')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(<Input placeholder="请输入" size="large" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Col md={6} sm={24}>
                        <FormItem label="注册日期">
                            {getFieldDecorator('addOn')(
                                <RangePicker format='YYYY-MM-DD' style={{ width: '100%' }} placeholder="请输入注册日期" size="large" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="登陆日期">
                            {getFieldDecorator('lastLogin')(
                                <RangePicker style={{ width: '100%' }} placeholder="请输入登陆日期" size="large" />
                            )}
                        </FormItem>
                    </Col> */}
          <Col md={8} sm={24}>
            <FormItem label="手机">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" size="large" />)}
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
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      user: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="roleAuth">角色分配</Menu.Item>
        <Menu.Item key="resetPassword">重置密码</Menu.Item>
        <Menu.Item key="disable">禁用</Menu.Item>
        <Menu.Item key="active">激活</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" size="large" onClick={() => this.handleAdd()}>
                新增
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button icon="more" type="primary" size="large">
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
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
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
