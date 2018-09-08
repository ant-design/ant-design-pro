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
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Popconfirm,
  Tabs,
  Tag,
  Avatar,
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { formatMessage, FormattedMessage } from 'umi/locale';
import { getTimeDistance } from '../../../utils/utils';

import styles from './TableList.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { Meta } = Card;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


const payOrReturn = {'1':'支付', '-1' : '退款'};
const payOrReturnColor = {'1':'green', '-1':'red'};

const payStatus = {'0':'待确认', '1':'已确认', 'V':'订单关闭'};
const payStatusColor = {'0':'orange', '1':'green', 'V':'grey'};

const relationFlag = {'0':'平','1':'长款','-1':'短款'};
const relationFlagColor = {'0':'grey','1':'orange','-1':'red'};

/* eslint react/no-multi-comp:0 */
@connect(({ table, chart, loading }) => ({
  table,
  chart,
  loading: loading.models.table,
}))
@Form.create()
class TableList extends PureComponent {

  getColumns = table => {
    // to update: 列名
    const { T_PAY_TYPE, T_THIRD,T_ORDER_TYPE,T_MERCHANT,T_CHANEL_TYPE } = table;
    return [

      {
        title: '平台时间',
        dataIndex: 'fDate',
        // fixed: 'left',
        render: val => (
          <span>{(val && moment(val, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}</span>
        ),
      },
      // {
      //   title: '操作',
      //   // fixed: 'left',
      //   align: 'center',
      //   width: 110,
      //   render: (text, record) => (
      //       record.fPayStatus === '1' && !record.fReturnStatus && record.fReturnStatus !=='0' &&
      //       (
      //       <Fragment>
      //         <Popconfirm title="确认退款吗?" onConfirm={this.handleReturn.bind(null, record)}>
      //           <a href="">退款</a>
      //         </Popconfirm>
      //       </Fragment>
      //       )
      //   ),
      // },
      {
        title: '订单号',
        dataIndex: 'fOrdertrace',
      },

      {
        title:'姓名',
        dataIndex: 'fBuyername',
      },
      {
        title:'电话',
        dataIndex: 'fBuyertel',
      },
      {
        title: '科室',
        dataIndex: 'fDepart',
      },

      // {
      //   title: '第三方',
      //   dataIndex: 'fThirdid',
      //   render(val) {
      //     return <span>{ T_THIRD && T_THIRD.kv[val] === '支付宝' && <Icon type="alipay" style={{color:'#00A3EE'}}/> }{ T_THIRD && T_THIRD.kv[val] === '微信' && <Icon type="wechat" style={{color:'green'}}/> }{T_THIRD ? '  '+T_THIRD.kv[val] : ''}</span>;
      //   },
      // },

      {
        title: '渠道',
        dataIndex: 'fChannel',
        render(val) {
          return <span>{T_CHANEL_TYPE ? T_CHANEL_TYPE.kv[val] : ''}</span>;
        },
      },
      {
        title: '支付类型',
        dataIndex: 'fPaytype',
        render(val) {
          return <span>{T_PAY_TYPE ? T_PAY_TYPE.kv[val] : ''}</span>;
        },
      },

      {
        title: '订单类型',
        dataIndex: 'fOrdertype',
        render(val) {
          return <span>{T_ORDER_TYPE ? T_ORDER_TYPE.kv[val] : ''}</span>;
        },
      },

      {
        title: '订单金额',
        dataIndex: 'f3totalFee',
        align: 'right',
        render: val => val/100 + '元',
      },

      {
        title: '支付状态',
        dataIndex: 'fPayStatus',
        render(val) {
          return <Tag color={payStatusColor[val]}>{payStatus[val]}</Tag>;
        },
      },

      {
        title: '支付对账',
        dataIndex: 'fPayFlag',
        render: (val) => (
          relationFlag[val] && 
          <Tag color={relationFlagColor[val]}>{relationFlag[val]}</Tag> || '-'
        ),
      },

      {
        title: '退款状态',
        dataIndex: 'fReturnStatus',
        render: (val) => (
          payStatus[val] && 
          <Tag color={payStatusColor[val]}>{payStatus[val]}</Tag> || '-'
        ),
      },

      {
        title: '退款对账',
        dataIndex: 'fReturnFlag',
        render: (val) => (
          relationFlag[val] && 
          <Tag color={relationFlagColor[val]}>{relationFlag[val]}</Tag> || '-'
        ),
      },

      // {
      //   title: '商户',
      //   dataIndex: 'fMerchantid',
      //   render(val) {
      //     return <span>{T_MERCHANT ? T_MERCHANT.kv[val] : ''}</span>;
      //   },
      // },

      // {
      //   title: '渠道',
      //   dataIndex: 'fChannel',
      //   render(val) {
      //     return <span>{T_CHANEL_TYPE ? T_CHANEL_TYPE.kv[val] : ''}</span>;
      //   },
      // },

      // {
      //   title: '第三方支付完成时间',
      //   dataIndex: 'f3dateEnd',
      //   render: val => (
      //     <span>{(val && moment(val, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}</span>
      //   ),
      // },
      
      // {
      //   title: '现金支付金额',
      //   dataIndex: 'f3cashFee',
      //   align: 'right',
      //   render: val => val/100 + '元',
      // },

      // {
      //   title: '第三方流水号',
      //   dataIndex: 'f3transactionId',
      // },

      // {
      //   title: '付款人第三方id号',
      //   dataIndex: 'f3openid',
      // },
    ];
  };

  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    addOrUpdate: 1,
    stepFormValues: {},

    // to update: tradeCode更新
    tradeSpace: 'torderpay',

    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_MERCHANTID',
        value: 'F_NAME',
        table: 'T_MERCHANT',
      },
    });

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_TYPE',
        value: 'F_NAME',
        table: 'T_CHANEL_TYPE',
      },
    });

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_TYPE',
        value: 'F_PRODUCT',
        table: 'T_ORDER_TYPE',
      },
    });

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_TYPE',
        value: 'F_NAME',
        table: 'T_PAY_TYPE',
      },
    });

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_THIRDID',
        value: 'F_NAME',
        table: 'T_THIRD',
      },
    });


    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: tradeSpace + '.selectOrderAndPay',
      },
    });

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, tradeSpace } = this.state;

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
      type: 'table/fetch',
      payload: {
        ...params,
        tradeCode: tradeSpace + '.selectOrderAndPay',
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { tradeSpace, rangePickerValue } = this.state;

    let date_start = moment(rangePickerValue[0]).format('YYYYMMDD');
    let date_end = moment(rangePickerValue[1]).format('YYYYMMDD');

    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: tradeSpace + '.selectOrderAndPay',
        date_start: date_start,
        date_end: date_end,
      },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows, tradeSpace } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'table/remove',
          payload: {
            fTypeList: selectedRows.map(row => row.fType).join(','),
            tradeCode: tradeSpace + '.deleteByPrimaryKey',
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleDeleteBatch = () => {
    const { dispatch } = this.props;
    const { selectedRows, tradeSpace } = this.state;

    if (!selectedRows) return;
    dispatch({
      type: 'table/remove',
      payload: {
        fErrnoList: selectedRows.map(row => row.fErrno).join(','),
        tradeCode: tradeSpace + '.deleteByPrimaryKey',
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
  };

  handleDelete = record => {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    if (!record) return;
    dispatch({
      type: 'table/remove',
      payload: {
        // to update: set primarykey
        fOrdertrace: record.fOrdertrace,
        tradeCode: tradeSpace + '.deleteByPrimaryKey',
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
  };


  handleReturn = record => {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    if (!record) return;
    dispatch({
      type: 'table/update',
      payload: {
        // to update: set primarykey
        indCode: record.fIndustryCode,
        chanelType: record.fChannel,
        merchantId: record.fMerchantid,
        operId: record.fOperid,
        termId: record.fTermid,
        orderId: record.fOrdertrace,
        refundAmt: record.f3totalFee,
        refundReason: '1',
        tradeCode: 'trans/return',
        returnSelect: tradeSpace + '.selectOrderAndPay',
      },
      callback: () => {
        if(!this.props.table.rspMsg){
          message.warning('退款申请发起成功');
        }
      },
    });

    dispatch({
      type: 'table/update',
      payload: {
        // to update: set primarykey
        indCode: record.fIndustryCode,
        chanelType: record.fChannel,
        merchantId: record.fMerchantid,
        operId: record.fOperid,
        termId: record.fTermid,
        orderId: record.fOrdertrace,
        tradeCode: 'trans/returnQuery',
        returnSelect: 'none',
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { tradeSpace, rangePickerValue } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      // 处理起始日期
      console.log('rangePickerValue:' + rangePickerValue);
      let date_start = moment(rangePickerValue[0]).format('YYYYMMDD');
      let date_end = moment(rangePickerValue[1]).format('YYYYMMDD');

      const values = {
        ...fieldsValue,
        date_start,
        date_end,
        // f_DATE: (fieldsValue.f_DATE && fieldsValue.f_DATE.format('YYYYMMDD')) || null,
        // date_start: (fieldsValue.date_start && fieldsValue.date_start.format('YYYYMMDD')) || null,
        // date_end: (fieldsValue.date_end && fieldsValue.date_end.format('YYYYMMDD')) || null,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'table/fetch',
        payload: {
          ...values,
          tradeCode: tradeSpace + '.selectOrderAndPay',
        },
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      addOrUpdate: 1,
    });
  };

  handleModalUpdate = (flag, tableRow) => {
    this.setState({
      modalVisible: !!flag,
      tableRow: tableRow,
      addOrUpdate: 2,
    });
  };

  handleUpdate = (fields, record) => {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;
    dispatch({
      type: 'table/update',
      payload: {
        ...record,
        ...fields,
        // f_DATE: fields.f_DATE.format('YYYYMMDD'),
        tradeCode: tradeSpace + '.updateByPrimaryKeySelective',
      },
    });

    message.success('更新成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;
    dispatch({
      type: 'table/add',
      payload: {
        ...fields,
        // f_DATE: fields.f_DATE.format('YYYYMMDD'),
        tradeCode: tradeSpace + '.insertSelective',
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { rangePickerValue } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 , marginBottom:'24px'}}
              />
              <div className={styles.salesExtra}>
                <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                  <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                </a>
                <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                  <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                </a>
                <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                  <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('fBuyername')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="电话">
              {getFieldDecorator('fBuyertel')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('fOrdertrace')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
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
      table,
    } = this.props;

    const { rangePickerValue } = this.state;

    const { T_PAY_TYPE, T_THIRD,T_ORDER_TYPE,T_MERCHANT,T_CHANEL_TYPE } = table;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 , marginBottom:'24px'}}
              />
              <div className={styles.salesExtra}>
                <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                  <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                </a>
                <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                  <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                </a>
                <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                  <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('fBuyername')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="电话">
              {getFieldDecorator('fBuyertel')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('fOrdertrace')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}  style={{marginTop: '0px'}}>
          <Col md={6} sm={24}>
            <FormItem label="商户">
              {getFieldDecorator(
                'fMerchantid'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {T_MERCHANT
                    ? T_MERCHANT.tv.map(d => (
                        <Option value={d.value}>{d.text}</Option>
                      ))
                    : ''}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="渠道类型">
              {getFieldDecorator(
                'fChannel'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {T_CHANEL_TYPE
                    ? T_CHANEL_TYPE.tv.map(d => (
                        <Option value={d.value}>{d.text}</Option>
                      ))
                    : ''}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="订单类型">
              {getFieldDecorator(
                'fOrdertype'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {T_ORDER_TYPE
                    ? T_ORDER_TYPE.tv.map(d => (
                        <Option value={d.value}>{d.text}</Option>
                      ))
                    : ''}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}  style={{marginTop: '0px'}}>
          <Col md={6} sm={24}>
            <FormItem label="支付类型">
              {getFieldDecorator(
                'fPaytype'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {T_PAY_TYPE
                    ? T_PAY_TYPE.tv.map(d => (
                        <Option value={d.value}>{d.text}</Option>
                      ))
                    : ''}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="第三方">
              {getFieldDecorator(
                'fThirdid'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {T_THIRD
                    ? T_THIRD.tv.map(d => (
                        <Option value={d.value}>{d.text}</Option>
                      ))
                    : ''}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="支付/退款">
              {getFieldDecorator(
                'fType'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">支付</Option>
                  <Option value="-1">退款</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ 
                // float: 'right',
                 marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </span>
            </div>
          </Col>
        </Row>
        
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });
  };

  render() {
    const {
      table: { data },
      table,
      loading,
    } = this.props;

    const { selectedRows } = this.state;

    const renderExpand = (record) => {
      const { T_PAY_TYPE, T_THIRD,T_ORDER_TYPE,T_MERCHANT,T_CHANEL_TYPE } = table;
      return (
        <p>
          <p style={{float:'left',width:'20%'}}>
            <h2>患者信息</h2>
            姓名:{record.fBuyername}
            <br/>
            手机:{record.fBuyertel}
            <br/>
            科室:{record.fDepart}
          </p>
          <p style={{float:'left',width:'20%'}}>
            <h2>订单信息</h2>
            订单号:{record.fOrdertrace}<br/>
            平台时间:{(record.fDate && moment(record.fDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}<br/>
            商户:{T_MERCHANT ? T_MERCHANT.kv[record.fMerchantid] : ''}<br/>
            渠道:{T_CHANEL_TYPE ? T_CHANEL_TYPE.kv[record.fChannel] : ''}<br/>
            订单类型:{T_ORDER_TYPE ? T_ORDER_TYPE.kv[record.fOrdertype] : ''}<br/>
            支付类型:{ T_THIRD && T_THIRD.kv[record.fThirdid] === '支付宝' && <Icon type="alipay" style={{color:'#00A3EE'}}/> }{ T_THIRD && T_THIRD.kv[record.fThirdid] === '微信' && <Icon type="wechat" style={{color:'green'}}/> }{T_THIRD ? '  '+T_THIRD.kv[record.fThirdid] : ''}-{T_PAY_TYPE ? T_PAY_TYPE.kv[record.fPaytype] : ''}<br/>
            金额:{record.f3totalFee/100 + '元'}<br/>
          </p>
          {record.f3transactionId && (
          <p style={{float:'left',width:'50%'}}>
            <h2></h2>
            第三方流水:{record.f3transactionId}<br/>
            第三方id:{record.f3openid}<br/>
            第三方时间:{(record.f3dateEnd && moment(record.f3dateEnd, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}<br/>
          </p>
          )
          }
        </p>
      );
    };

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* // to choose: 设置查询条件 */}
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            {/* <div className={styles.tableListOperator} /> */}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns(table)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1500 }}
              expandedRowRender={renderExpand}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
};
export default TableList;
