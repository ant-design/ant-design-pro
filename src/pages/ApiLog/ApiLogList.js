import React, {PureComponent} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Table,
  Spin,
  DatePicker
} from 'antd';
import debounce from 'lodash/debounce';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';
import styles from '../ApiGateway/ApiList.less';
import {getItems} from '@/utils/masterData';
import Detail from './Detail';
import {getUserId, getUserName} from "../../utils/authority";
import {getTimeDistance} from '@/utils/utils';

const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({apiLogModel, uniComp, loading}) => ({
  apiLogModel,
  uniComp,
  loading: loading.models.apiLogModel,
}))
@Form.create()
class ApiLogList extends PureComponent {

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchApi = debounce(this.fetchApi, 800);
  }

  // 数据存放
  state = {
    expandForm: false,
    selectedRow: {},
    formValues: {},
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    filtersArg: {},
    sorter: {},
    drawerVisible: false,
    logList: [],
    data: [],
    value: [],
    fetching: false,
    rangePickerValue: getTimeDistance('today'),
    targetOrgs:[],
    expandAllFlag:false,// 初始时是否展开
  };

  // 调用基础配置获取列表接口
  componentWillMount() {
    const {dispatch} = this.props;
    /* 获取apiDebug数据 */
    const userId = getUserId();
    const tableName = "org";
    const pageSize = 9999;
    const userName = getUserName();
    const params = {userId, tableName, pageSize, userName};
    console.log('binddata', params);
    dispatch({
      type: 'uniComp/list',
      payload: params,
      onConversionData: undefined,
      callback: resp => {

        const {data}= resp;
        const {records}= data;
        const targetOrgs = records.map(
          (item)=>(item.id)
        );
        console.log("targetOrgs",targetOrgs);
        this.setState({targetOrgs});
      }
    });

  }

  getOptionMaster(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  getRowByKey(key, newData) {
    const {logList} = this.state;
    return (newData || logList).filter(item => item.orderId === key)[0];
  }


  getOption(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  // Table的配置，点击图标触发
  onExpand = (expanded, record) => {
    console.log("onExpand1111", record);
    const {dispatch} = this.props;
    const {orderId, orderCode} = record;
    const {logList} = this.state;
    const newData = logList.map(item => ({...item}));

    const target = this.getRowByKey(orderId, newData);
    // console.log("onExpand",target);
    if (target && expanded) {

      if (target.expanded) {
        console.log("");
      } else {
        const payload = {};
        payload.orderCode = orderCode;
        dispatch({
          type: 'apiLogModel/logItemList',
          payload,
          callback: resp => {
            // console.log("onExpand",resp);
            const {data} = resp;
            const {intfOrderItems} = data;
            target.logItemList = intfOrderItems;
            target.expanded = true;
            this.setState({logList: newData});
          }
        });
      }

    }

  }

  // 额外的展开行
  expandedRowRender = (exRecord) => {

    console.log("expandedRowRender", exRecord);
    const {logItemList} = exRecord;
    const columns = [
      {
        title: 'OrderItem Code',
        dataIndex: 'orderItemCode',
        render: (text, record) =>
          <a onClick={() => this.handleDetail(record)}>{text}</a>,
      },
      {
        title: 'Impl Type',
        dataIndex: 'implType',
      },
      {
        title: 'Request Target',
        dataIndex: 'reqTarget',
        render : val =>  <Ellipsis tooltip length={40} style={{overflow: "inherit"}}>{`${val}`}</Ellipsis>
      },
      {
        title: 'Request Time',
        dataIndex: 'reqTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'Response Time',
        dataIndex: 'respTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];

    return (<Table columns={columns} size="small" dataSource={logItemList} pagination={false} />);

  };

  /**
   * {status: Array(2)} 转化为{status: "1,2"}
   */
  conversionFilter = filtersArg => {
    return Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
  };

  // 重置按钮
  handleFormReset = () => {
    const {form, dispatch} = this.props;
    const {targetOrgs} = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    const userName = getUserName();
    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      userName,
      targetOrgs
    };
    dispatch({
      type: 'apiLogModel/logList',
      payload,
      callback: resp => {
        const {data} = resp;
        const {records, pagination} = data;
        this.setState({
          logList: records,
          pagination
        });
      }
    });
  };

  // 切换按钮
  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  // 根据条件查询api数据
  fetchApi = (value) => {
    this.lastFetchId += 1;
    this.setState({data: [], fetching: true});
    const {dispatch} = this.props;
    const userId = getUserId();
    const payload = {userId};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      name: value
    };
    dispatch({
      type: 'apiLogModel/apiListBySearch',
      payload,
      callback: resp => {
        if (resp.code === '200') {
          const {data} = resp;
          const {records} = data;
          const newData = records.map(api => ({
            text: `${api.name}`,
            value: api.apiId,
          }));
          this.setState({data: newData, fetching: false});
        }
      }
    });
  };

  // 调用日志订单查询接口
  handleSearch = e => {
    e.preventDefault();// 组织默认行为

    const {dispatch, form} = this.props;
    const {targetOrgs} = this.state;

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

      const {requestTime, extFlag,extInput} = values;
      switch (extFlag) {
        case "1":
          values.extReq1 = extInput;
          break;
        case "2":
          values.extReq2 = extInput;
          break;
        case "3":
          values.extReq3 = extInput;
          break;
        case "4":
          values.extRsp1 = extInput;
          break;
        case "5":
          values.extRsp2 = extInput;
          break;
        case "6":
          values.extRsp3 = extInput;
          break;
        default:
          break;
      }
      const requestStartTime = requestTime[0].format('YYYY-MM-DD HH:mm:ss.SSS');
      const requestEndTime = requestTime[1].format('YYYY-MM-DD HH:mm:ss.SSS');
      const {filtersArg, sorter} = this.state;
      const filters = this.conversionFilter(filtersArg);
      const userName = getUserName();
      const payload = {};
      payload.data = {};
      payload.data.info = {
        pageNo: 1,
        pageSize: 10,
        ...filters,
        ...values,
        ...sorter,
        requestStartTime,
        requestEndTime,
        userName,
        targetOrgs
      };
      dispatch({
        type: 'apiLogModel/logList',
        payload,
        callback: resp => {
          const {data} = resp;
          const {records, pagination} = data;
          this.setState({
            logList: records,
            pagination
          });
        }
      });
    });
  };

  // 当分页、排序、筛选变化时触发
  handleTableChange = (paginations, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues,targetOrgs} = this.state;

    const {requestTime,extFlag ,extInput } = formValues;
    const requestStartTime = requestTime[0].format('YYYY-MM-DD HH:mm:ss.SSS');
    const requestEndTime = requestTime[1].format('YYYY-MM-DD HH:mm:ss.SSS');

    switch (extFlag) {
      case "1":
        formValues.extReq1 = extInput;
        break;
      case "2":
        formValues.extReq2 = extInput;
        break;
      case "3":
        formValues.extReq3 = extInput;
        break;
      case "4":
        formValues.extRsp1 = extInput;
        break;
      case "5":
        formValues.extRsp2 = extInput;
        break;
      case "6":
        formValues.extRsp3 = extInput;
        break;
      default:
        break;
    }

    this.setState({pagination: paginations, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);
    const params = {
      pageNo: paginations.current,
      pageSize: paginations.pageSize,
      ...formValues,
      ...filters,
      requestStartTime,
      requestEndTime,
      targetOrgs
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    const userName = getUserName();
    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      ...params,
      userName,
      targetOrgs
    };
    payload.data.info.pageNo = payload.data.info.pageNo ? payload.data.info.pageNo : 1;
    dispatch({
      type: 'apiLogModel/logList',
      payload,
      callback: resp => {
        const {data} = resp;
        const {records, pagination} = data;
        this.setState({
          logList: records,
          pagination
        });
      }
    });
  };

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  handleDetail = (record) => {
    this.handleDrawerVisible(record, true);
  }

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }


  isActive = type => {
    const {rangePickerValue} = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  selectDate = type => {

    const {form} = this.props;

    form.setFieldsValue({
      requestTime: getTimeDistance(type)
    });

    this.setState({
      rangePickerValue: getTimeDistance(type)
    });

  };

  handleRangePickerChange = rangePickerValue => {

    const {form} = this.props;

    form.setFieldsValue({
      requestTime:rangePickerValue
    });
    this.setState({
      rangePickerValue
    });
  };

  // 面板收起
  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {fetching, data, value, rangePickerValue} = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="Transaction Id">
              {getFieldDecorator('transactionId')(<Input placeholder="please enter consumer Transaction Id" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="App Key">
              {getFieldDecorator('appKey')(<Input placeholder="please enter consumer App Key" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Request Time">
              <div className={styles.salesExtraWrap}>
                {/*<div className={styles.salesExtra}>
                  <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                    All Day
                  </a>
                  <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                    All Week
                  </a>
                  <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                    All Month
                  </a>
                  <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                    All Year
                  </a>
                </div>*/}
                {getFieldDecorator('requestTime', {
                  initialValue: rangePickerValue
                })(<RangePicker
                  onChange={this.handleRangePickerChange}
                  showTime={{ format: 'HH:mm' }}
                  style={{width: 256}}
                />)}
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="Api Name">
              {getFieldDecorator('apiId')(
                <Select
                  showSearch="true"
                  labelInValue
                  value={value}
                  placeholder="Select Api Name"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchApi}
                  onChange={this.handleChange}
                  style={{width: '100%'}}
                >
                  {data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="status">
              {getFieldDecorator('status', {})(
                <Select placeholder="please choose" style={{width: '100%'}}>
                  {this.getOption("intfOrder", "status")}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Query
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset} htmlType="button">
                Reset
              </Button>
              <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                UnFold <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 面板展开
  renderAdvancedForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {fetching, data, value, rangePickerValue} = this.state;

    const orderExtSel =
      getFieldDecorator('extFlag', {})(
        <Select style={{width: 110}}>{this.getOptionMaster("apiOrderExt", "ext_flag")}</Select>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="Transaction Id">
              {getFieldDecorator('transactionId')(<Input placeholder="please enter Transaction Id" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="App Key">
              {getFieldDecorator('appKey')(<Input placeholder="please enter consumer App Key" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Request Time">
              {getFieldDecorator('requestTime', {
                initialValue: rangePickerValue
              })(<RangePicker
                onChange={this.handleRangePickerChange}
                showTime={{ format: 'HH:mm' }}
                style={{width: 256}}
              />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="Api Name">
              {getFieldDecorator('apiId')(
                <Select
                  showSearch="true"
                  labelInValue
                  value={value}
                  placeholder="Select Api Name"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchApi}
                  onChange={this.handleChange}
                  style={{width: '100%'}}
                >
                  {data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="status">
              {getFieldDecorator('status', {})(
                <Select placeholder="please choose" style={{width: '100%'}}>
                  {this.getOption("intfOrder", "status")}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Ext Select">
              {getFieldDecorator('extInput', {})(<Input addonBefore={orderExtSel} placeholder="please enter Ext Select" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="KeyValue">
              {getFieldDecorator('keyValue')(<Input placeholder="please enter KeyValue" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{overflow: 'hidden'}}>
          <div style={{float: 'right', marginBottom: 24}}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{marginLeft: 8}} onClick={this.handleFormReset} htmlType="button">
              Reset
            </Button>
            <a style={{marginLeft: 8}} onClick={this.toggleForm}>
              Fold <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  // 决定展现形式，默认是收起
  renderForm() {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {expandAllFlag}= this.state;
    const {loading} = this.props;
    const {logList, pagination, drawerVisible, selectedRow} = this.state;
    const intfOrderItemMessages = selectedRow ? selectedRow.intfOrderItemMessages : [];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: 'Transaction Id',
        dataIndex: 'transactionId',
      },
      {
        title: 'status',
        dataIndex: 'statusName',
      },
      {
        title: 'Source Type',
        dataIndex: 'sourceTypeName',
      },
      {
        title: 'Api Name',
        dataIndex: 'apiName',
      },
      {
        title: 'App Key',
        dataIndex: 'appKey',
      },
      {
        title: 'Order Code',
        dataIndex: 'orderCode'
      },
      {
        title: 'Request Time',
        dataIndex: 'requestTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'Response Time',
        dataIndex: 'responseTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    const defaultExpandedRowKeys=[];
    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              size="small"
              columns={columns}
              expandedRowRender={(record) => this.expandedRowRender(record)}
              onExpand={(expanded, record) => this.onExpand(expanded, record)}
              dataSource={logList}
              pagination={paginationProps}
              onChange={this.handleTableChange}
              defaultExpandAllRows={expandAllFlag}
              defaultExpandedRowKeys={defaultExpandedRowKeys}
            />
            <Drawer
              width={850}
              placement="right"
              closable
              onClose={this.onDrawerClose}
              visible={drawerVisible}
            >
              <Detail orderItem={intfOrderItemMessages} />
            </Drawer>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ApiLogList;
