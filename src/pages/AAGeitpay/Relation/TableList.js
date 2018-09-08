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
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


const payOrReturn = {'1':'支付', '-1' : '退款'};
const payOrReturnColor = {'1':'green', '-1':'red'};

const payStatus = {'0':'待确认', '1':'已确认', 'V':'订单关闭'};
const payStatusColor = {'0':'orange', '1':'green', 'V':'grey'};

/* eslint react/no-multi-comp:0 */
@connect(({ table, chart, loading }) => ({
  table,
  chart,
  loading: loading.models.table,
}))
@Form.create()
export default class TableList extends PureComponent {
  getColumns = table => {
    // to update: 列名
    const { T_PAY_TYPE, T_THIRD,T_ORDER_TYPE,T_MERCHANT,T_CHANEL_TYPE } = table;
    return [

      {
        title: '交易日期',
        dataIndex: 'fTransdate',
        fixed: 'left',
        render: val => (
          <span>{(val && moment(val, 'YYYYMMDD').format('YYYY-MM-DD')) || '-'}</span>
        ),
      },
      {
        title: '对账流水号',
        dataIndex: 'fSystrace',
      },

      {
        title: '商户',
        dataIndex: 'fMerchantid',
        render(val) {
          return <span>{T_MERCHANT ? T_MERCHANT.kv[val] : ''}</span>;
        },
      },

      {
        title: '第三方',
        dataIndex: 'fThirdid',
        render(val) {
          return <span>{ T_THIRD && T_THIRD.kv[val] === '支付宝' && <Icon type="alipay" style={{color:'#00A3EE'}}/> }{ T_THIRD && T_THIRD.kv[val] === '微信' && <Icon type="wechat" style={{color:'green'}}/> }{T_THIRD ? '  '+T_THIRD.kv[val] : ''}</span>;
        },
      },

      {
        title:'平台流水号',
        dataIndex:'fPttrace',
      },
      {
        title:'商户订单号',
        dataIndex:'fOrderid',
      },
      {
        title:'交易类型',
        dataIndex:'fTranstype',
        render(val) {
          return <Tag color={payOrReturnColor[val]}>{payOrReturn[val]}</Tag>;
        },
      },
      {
        title:'交易金额',
        dataIndex:'fPtamt',
        align: 'right',
        render: val => val + '元',
      },
      {
        title:'第三方金额',
        dataIndex:'fThirdamt',
        align: 'right',
        render: val => val + '元',
      },
      {
        title:'his金额',
        dataIndex:'fHisamt',
        align: 'right',
        render: val => val + '元',
      },
      {
        title:'本订单平台存在标志',
        dataIndex:'fPtflag',
      },
      {
        title:'本订单第三方存在标志',
        dataIndex:'fThirdflag',
      },
      {
        title:'本订单HIS存在标志',
        dataIndex:'fHisflag',
      },

      {
        title: '对账时间',
        dataIndex: 'fDate',
        render: val => (
          <span>{(val && moment(val, 'YYYYMMDD').format('YYYY-MM-DD')) || '-'}</span>
        ),
      },

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
    tradeSpace: 'trelationtrans',

    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

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
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_MERCHANTID',
        value: 'F_NAME',
        table: 'T_MERCHANT',
      },
    });


    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: tradeSpace + '.selectByPrimaryKey',
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
        tradeCode: tradeSpace + '.selectByPrimaryKey',
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
        tradeCode: tradeSpace + '.selectByPrimaryKey',
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
          tradeCode: tradeSpace + '.selectByPrimaryKey',
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
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
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
          <Col md={6} sm={24}>
            <FormItem label="对账流水">
              {getFieldDecorator('fSystrace')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
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
          <Col md={6} sm={24}>
            <FormItem label="对账流水">
              {getFieldDecorator('fSystrace')(<Input placeholder="请输入" />)}
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
            <FormItem label="订单号">
              {getFieldDecorator('fOrderid')(<Input placeholder="请输入" />)}
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

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* // to choose: 设置查询条件 */}
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator} />
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns(table)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 2000 }}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
