import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  // Dropdown,
  // Menu,
  // DatePicker,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './ApiList.less';
import constants from '@/utils/constUtil';
// import {fetchEnumData, getItem, getItemValue} from "@/utils/masterData";

const { DEL_ACT, ONLINE_ACT, OFFLINE_ACT, API_STATUS_0, API_STATUS_1, API_STATUS_2 } = constants;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '未发布', '已发布', '异常'];
const groupId = ['语音识别', 'OCR识别', '身份识别', '文本识别'];

/* eslint react/no-multi-comp:0 */
@connect(({ apiGateway, loading }) => ({
  apiGateway,
  loading: loading.models.apiGateway,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'API名称',
      dataIndex: 'name',
    },
    {
      title: '分组',
      dataIndex: 'groupId',
      render(val) {
        return <Fragment>{groupId[val]} </Fragment>;
      },
    },
    {
      title: '状态',
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
        {
          text: status[2],
          value: 2,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <span
            id="toOnline"
            style={{
              display:
                record.status === API_STATUS_1 || record.status === API_STATUS_0
                  ? 'inline'
                  : 'none',
            }}
          >
            <a onClick={() => this.handleStatusClick(ONLINE_ACT, record)}>发布</a>
            <Divider type="vertical" />
          </span>
          <span
            id="toOffline"
            style={{
              display: record.status === API_STATUS_2 ? 'inline' : 'none',
            }}
          >
            <a onClick={() => this.handleStatusClick(OFFLINE_ACT, record)}>下线</a>
            <Divider type="vertical" />
          </span>

          <span
            id="toOnline"
            style={{
              display: record.status === API_STATUS_1 ? 'inline' : 'none',
            }}
          >
            <a onClick={() => this.handleStatusClick(DEL_ACT, record)}>删除</a>
            <Divider type="vertical" />
          </span>
          <a onClick={() => this.handleTest(true, record)}>调试</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleTest(true, record)}>授权</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // fetchEnumData(this, constants.API_STATE_KEY);
    console.log('state1:', this.state);
    dispatch({
      type: 'apiGateway/fetch',
    });
  }

  respDeal = (resp, dispatch) => {
    const { code } = resp;
    let { msg } = resp;
    if (code === 200) {
      if (!msg || msg === '') {
        msg = '操作成功';
      }
      message.success(msg);
      this.setState({
        selectedRows: [],
      });
      dispatch({
        type: 'apiGateway/fetch',
        payload: {},
      });
    } else {
      message.error(`error:${msg}`);
    }
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
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'apiGateway/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'apiGateway/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleStatusClick = (act, record) => {
    const { dispatch } = this.props;

    const payload = {};
    payload.data = {};
    payload.data.info = {};
    payload.option = parseInt(act, 10);
    payload.data.info.apiIds = [record.apiId];
    console.log('-----:', payload, act);
    dispatch({
      type: 'apiGateway/remove',
      payload,
      callback: resp => {
        this.respDeal(resp, dispatch);
      },
    });
  };
  // handleMenuClick = e => {
  //   const { dispatch } = this.props;
  //   const { selectedRows } = this.state;
  //
  //   if (!selectedRows) return;
  //
  //   const payload={};
  //   payload.data={};
  //   payload.data.info={};
  //   payload.option=parseInt(e.key,10);
  //   console.log("-----:",payload,e.key);
  //   payload.data.info.apiIds=selectedRows.map(row => row.apiId);
  //   selectedRows.forEach((data, index, array) => {
  //     console.log(data, index, array);
  //   });
  //   dispatch({
  //     type: 'apiGateway/remove',
  //     payload,
  //     callback: (resp) => {
  //       this.respDeal(resp,dispatch);
  //     },
  //   });
  // };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // updatedTime: fieldsValue.updatedTime && fieldsValue.updatedTime.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'apiGateway/fetch',
        payload: values,
      });
    });
  };

  handleTest = (flag, record) => {
    console.log('handleTest', flag, record);
    message.success('下一个版本实现');
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Api名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分组">
              {getFieldDecorator('groupId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">语音识别</Option>
                  <Option value="1">OCR识别</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset} htmlType="button">
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
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
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Api名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分组">
              {getFieldDecorator('groupId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">语音识别</Option>
                  <Option value="1">OCR识别</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">未发布</Option>
                  <Option value="2">已发布</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset} htmlType="button">
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      apiGateway: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    console.log('state2:', this.state);
    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key={DEL_ACT}>删除/下线</Menu.Item>
    //     <Menu.Item key={ONLINE_ACT}>发布</Menu.Item>
    //   </Menu>
    // );

    const rowKey = 'apiId';
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button htmlType="button">批量删除</Button>
                  {/* <Dropdown overlay={menu}> */}
                  {/* <Button> */}
                  {/* 更多操作 <Icon type="down" /> */}
                  {/* </Button> */}
                  {/* </Dropdown> */}
                </span>
              )}
            </div>
            <StandardTable
              rowKey={rowKey}
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

export default TableList;
