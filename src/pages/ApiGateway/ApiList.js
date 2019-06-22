import React, {Fragment, PureComponent} from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import moment from 'moment';
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import styles from './ApiList.less';
import constants from '@/utils/constUtil';
import {getGroupName, getItems, getItemValue2} from '@/utils/masterData';
import SelectView from './SelectView';
import OrgTransfer from './OrgTransfer';
import {getPayloadForAccess} from './ApiCreate/util';
import Authorized from '@/utils/Authorized';
import {getAuth, getUserId} from '@/utils/authority';

const { check } = Authorized;

const { ACT, API_STATUS } = constants;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'default', 'error'];
const statusList = getItems('apiService', 'status');
// const serviceTypeList = getItems('apiService', 'service_type');
const statusFilter = statusList.map(item => ({
  value: item.itemCode,
  text: item.itemValue,
}));

/* eslint react/no-multi-comp:0 */
@connect(({ apiGatewayModel, apiCreateModel, groupModel, loading }) => ({
  apiGatewayModel,
  apiCreateModel,
  groupList: groupModel.groupList,
  loading: loading.models.apiGatewayModel,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    selectedRow: {},
    updateApiServiceOrg: [],
    formValues: {},
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    filtersArg: {},
    sorter: {},
    modalVisible: false,
    drawerVisible: false,
    userId: null,
    // columns:[],
  };

  componentWillMount() {
    console.log("-----will mount")
    const {dispatch} = this.props;
    // 分组列表
    dispatch({
      type: 'groupModel/allGroupList',
      // callback: (groupList) => {
      //   const columns = this.getColumns(groupList);
      //   this.setState({columns});
      // },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const payload = {};
    const userId = getUserId();
    this.setState({ userId });
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      userId,
    };
    dispatch({
      type: 'apiGatewayModel/apiList',
      payload,
    });
    console.log("----did mount")
  }

  getGroupOption() {
    const {groupList} = this.props;
    return this.getOption(groupList, 'groupId', 'groupName');
  }

  getColumns = memoizeOne((groupList) => {

    console.log("---render^^^^^^^^^^^^^^^^");
    const auth = getAuth('api_save'); // 获取某个功能权的角色
    const commandAct = check(auth, 'commandAct'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容

    console.log("---", groupList)
    // {
    //   title: '服务类型',
    //     dataIndex: 'serviceType',
    //   render(val) {
    //     return <Fragment>{getItemValue2(serviceTypeList, val)} </Fragment>;
    //   },
    // },
    const columns = [
      {
        title: 'API Id',
        dataIndex: 'apiId',
      },
      {
        title: 'API名称',
        dataIndex: 'name',
        /*  执行函数 */
        render: (text, record) =>
          <a onClick={() => this.handleDetail(true, record)}>
            <Ellipsis length={15} tooltip>
              {text}
            </Ellipsis>
          </a>,
      },
      {
        title: '分组',
        dataIndex: 'groupId',
        /* 返回数据 */
        render(val) {
          return <Fragment>{getGroupName(groupList, val)} </Fragment>;
        },
      },
      {
        title: '请求地址',
        dataIndex: 'requestUrl',
        render(val) {
          return <Ellipsis length={20} tooltip>{val}</Ellipsis>;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: statusFilter,
        render(val) {
          return <Badge status={statusMap[val]} text={getItemValue2(statusList, val)} />;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updatedTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    if (commandAct) {
      const actions = {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <span
              id="toOnline"
              style={{
                display:
                  record.status === API_STATUS.OFFLINE || record.status === API_STATUS.CLOSE
                    ? 'inline'
                    : 'none',
              }}
            >
              <a onClick={() => this.handleStatusClick(ACT.ONLINE, record)}>发布</a>
              <Divider type="vertical" />
            </span>
            <a onClick={() => this.handleAccess(true, record)}>授权</a>
            <Divider type="vertical" />
            {this.renderMoreBtn({current: record})}
          </Fragment>
        ),
      };
      columns.push(actions);
    }

    return columns;
  }, isEqual);

  moreHandle = (key, record) => {
    if (key === 'handleUpdate') this.handleUpdate(true, record);
    else if (key === 'handleUpdateDoc') {
      this.handleUpdateDoc(true, record);
    } else if (key === 'handleDebug') {
      this.handleDebug(true, record);
    } else if (key === 'handleOffline') {
      this.handleStatusClick(ACT.OFFLINE, record);
    } else if (key === 'handleDelete') {
      this.handleStatusClick(ACT.DEL, record);
    }
  };

  renderMoreBtn = props => {
    const {current} = props;
    const {status} = current;
    return (
      <Dropdown
        overlay={
          <Menu onClick={({key}) => this.moreHandle(key, current)}>
            <Menu.Item key="handleUpdate">修改</Menu.Item>
            <Menu.Item key="handleUpdateDoc">文档</Menu.Item>
            <Menu.Item key="handleDebug">调试</Menu.Item>
            {status === API_STATUS.ONLINE ? <Menu.Item key="handleOffline">下线</Menu.Item> : null}
            {status === API_STATUS.OFFLINE ? <Menu.Item key="handleDelete">删除</Menu.Item> : null}
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );
  };

  getOption = (list, keyName, titleName) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item[keyName]} value={item[keyName]}>
        {item[titleName]}
      </Option>
    ));
  };

  respDeal = resp => {
    const { code } = resp;
    let { msg } = resp;
    if (code === '200') {
      if (!msg || msg === '') {
        msg = '操作成功';
      }
      message.success(msg);
      this.setState({
        selectedRows: [],
      });
      const { pagination, filtersArg, sorter } = this.state;
      this.handleStandardTableChange(pagination, filtersArg, sorter);
    } else {
      message.error(`error:${msg}`);
    }
  };

  /**
   * {status: Array(2)} 转化为{status: "1,2"}
   */
  conversionFilter = filtersArg => {
    return Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, userId } = this.state;
    this.setState({ pagination, filtersArg, sorter });
    const filters = this.conversionFilter(filtersArg);
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      ...params,
      userId,
    };
    payload.data.info.pageNo = payload.data.info.pageNo ? payload.data.info.pageNo : 1;
    dispatch({
      type: 'apiGatewayModel/apiList',
      payload,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    const { userId } = this.state;
    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      userId,
    };
    dispatch({
      type: 'apiGatewayModel/apiList',
      payload,
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
      type: 'apiGatewayModel/apiStatusBatch',
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
  //     type: 'apiGatewayModel/remove',
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
      console.log(fieldsValue, values);
      this.setState({
        formValues: values,
      });

      const { filtersArg, sorter, userId } = this.state;
      const filters = this.conversionFilter(filtersArg);
      const payload = {};
      payload.data = {};
      payload.data.info = {
        pageNo: 1,
        pageSize: 10,
        userId,
        ...filters,
        ...values,
        ...sorter,
      };
      dispatch({
        type: 'apiGatewayModel/apiList',
        payload,
      });
    });
  };

  handleAccess = (flag, record) => {
    console.log('handleTest', flag, record);
    if(  record.status === API_STATUS.OFFLINE || record.status === API_STATUS.CLOSE ) {
      message.error("Api还未发布无法授权！");
      return ;
    }
    this.setState({ selectedRow: record });
    const { dispatch } = this.props;
    const payload = {};
    payload.data = {};
    payload.data.info = {};
    payload.data.info.apiId = record.apiId;
    dispatch({
      type: 'apiCreateModel/apiInfo',
      payload,
      callback: resp => {
        this.setState({ selectedRow: resp.data });
      },
    });

    this.handleModalVisible(record, flag);
    // message.success('下一个版本实现');
  };

  handleDebug = (flag, record) => {

    const { apiId } = record;
    // router.push(`/apiGateway/apiCreate/${apiId}`);
    router.push({
      pathname: `/apiGateway/apiDebug`, // 通过url参数传递
      state: {
        // 通过对象传递
        apiId,
        record, // 表格某行的对象数据
      },
    });

  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  // handleVisible = drawerVisible => {
  //   // console.log("---modalVisible＝＝＝＝3:",modalVisible);
  //   this.setState({ drawerVisible });
  // };

  handleUpdate = (flag, record) => {
    const { apiId } = record;
    // router.push(`/apiGateway/apiCreate/${apiId}`);
    router.push({
      pathname: `/apiGateway/apiUpdate`, // 通过url参数传递
      state: {
        // 通过对象传递
        apiId,
        record, // 表格某行的对象数据
      },
    });
  };

  handleUpdateDoc = (flag, record) => {
    const { apiId } = record;
    // router.push(`/apiGateway/apiCreate/${apiId}`);
    router.push({
      pathname: `/apiGateway/apiDocUpdate`, // 通过url参数传递
      state: {
        // 通过对象传递
        apiId,
        record, // 表格某行的对象数据
      },
    });
  };

  handleDetail = (flag, record) => {
    const { apiId } = record;
    router.push({
      pathname: `/apiGateway/apiDetail`, // 通过url参数传递
      state: {
        // 通过对象传递
        apiId, // 如果相同则简写 apiId : apiId
        record, // 表格某行的对象数据
      },
    });
  };

  handleOrgTransfer = updateApiServiceOrg => {
    console.log('---updateApiServiceOrg＝＝＝＝3:', updateApiServiceOrg);
    this.setState({ updateApiServiceOrg });
  };

  okHandle = () => {
    const { updateApiServiceOrg, selectedRow } = this.state;
    const { dispatch } = this.props;
    console.log('---updateApiServiceOrg＝＝＝＝4:', updateApiServiceOrg);
    selectedRow.apiServiceOrgs = updateApiServiceOrg;
    const apiInfo = getPayloadForAccess(selectedRow);
    console.log('api access submit apiInfo:', apiInfo);
    // submit the values
    dispatch({
      type: 'apiCreateModel/submitAccess',
      payload: apiInfo,
      callback: response => {
        if (response.code === '200') {
          const msg = response.msg || 'success.';
          this.setState({
            modalVisible: false,
            selectedRow: null,
          });
          message.success(msg);
        } else {
          const msg = response.msg || '服务器内部错误。';
          message.error(msg);
        }
      },
    });
    // console.log("submitAccess");
    // this.setState({
    //   modalVisible: false,
    //   selectedRow: null,
    // });
  };

  cancelHandle = () => {
    this.setState({
      modalVisible: false,
      selectedRow: null,
    });
  };

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: flag,
      selectedRow: row,
    });
  };

  // handleDrawerVisible = (row, flag) => {
  //   this.setState({
  //     drawerVisible: flag,
  //     selectedRow: row,
  //   });
  // };

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
                  {this.getGroupOption()}
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
                  {this.getGroupOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(<SelectView javaCode="apiService" javaKey="status" />)}
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
    // console.log("ddddabc--apilist====:", localStorage.getItem("antd-pro-authority"));
    const {
      apiGatewayModel: { data },
      loading,
      groupList,
    } = this.props;
    const {selectedRows, modalVisible, selectedRow, drawerVisible} = this.state;
    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key={DEL_ACT}>删除/下线</Menu.Item>
    //     <Menu.Item key={ONLINE_ACT}>发布</Menu.Item>
    //   </Menu>
    // );

    const rowKey = 'apiId';

    const columns = groupList && groupList.length > 0 ? this.getColumns(groupList) : [];
    console.log("---render#$%$$$$$$", columns);
    return (
      <PageHeaderWrapper showBreadcrumb style={{ height: '50px' }}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  {/* <Button htmlType="button">批量操作</Button> */}
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
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <Modal
            title="授权"
            visible={modalVisible}
            onOk={() => this.okHandle()}
            onCancel={() => this.cancelHandle()}
          >
            {/* <Transfer */}
            {/* dataSource={mockData} */}
            {/* titles={['Source', 'Target']} */}
            {/* targetKeys={[]} */}
            {/* selectedKeys={[]} */}
            {/* onScroll={this.handleScroll} */}
            {/* render={item => item.title} */}
            {/* /> */}
            <OrgTransfer targetData={selectedRow} onOrgTransfer={this.handleOrgTransfer} />
          </Modal>
          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={drawerVisible}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
