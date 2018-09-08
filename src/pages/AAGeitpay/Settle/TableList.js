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
  Table,
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


const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleUpdate,
    handleModalVisible,
    record,
    addOrUpdate,

    // to update: value to text的数据源，这里是表名
    T_MERCHANT,
    T_THIRD,
  } = props;

  // to update: 字段名，用于双向绑定数据
  const { f_CHAR, f_SELECT, f_DATE, f_NUMBER } = record;

  const getMDate = date => {
    if (date) return moment(date);
    else return moment();
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (addOrUpdate === 1) handleAdd(fieldsValue);
      if (addOrUpdate === 2) handleUpdate(fieldsValue, record);
    });
  };
  return (
    <Modal
      destroyOnClose
      title={(addOrUpdate === 1 && '对账') || (addOrUpdate === 2 && '更新')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      {/* // to update: form表单内容，修改字段名称 */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商户">
        {form.getFieldDecorator(
          'merchantId',
          // {
          //   initialValue: f_SELECT ? `${f_SELECT}` : ``,
          // }
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

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="第三方">
        {form.getFieldDecorator(
          'thirdId',
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

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="日期">
        {form.getFieldDecorator('accDate', {
          // initialValue: getMDate(f_DATE),
        })(<DatePicker style={{ width: '100%' }} placeholder="请输入日期" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()


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

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index%6 === 0) {
        obj.props.rowSpan = 6;
      }else{
        obj.props.rowSpan = 0;
      }
      return obj;
    };

    return [

      // {
      //   title: '交易日期',
      //   dataIndex: 'fTransdate',
      //   fixed: 'left',
      //   render: (val,row,index) => (
      //     renderContent(<span>{(val && moment(val, 'YYYYMMDD').format('YYYY-MM-DD')) || '-'}</span>,row,index)
      //   ),
      // },

      // {
      //   title: '对账流水号',
      //   dataIndex: 'fSystrace',
      //   render: renderContent,
      // },

      {
        title: '商户',
        dataIndex: 'fMerchantid',
        render(val,row,index) {
          return renderContent(<span>{T_MERCHANT ? T_MERCHANT.kv[val] : ''}</span>,row,index);
        },
      },

      {
        title: '第三方',
        dataIndex: 'fThirdid',
        render(val,row,index) {
          return renderContent(<span>{ T_THIRD && T_THIRD.kv[val] === '支付宝' && <Icon type="alipay" style={{color:'#00A3EE'}}/> }{ T_THIRD && T_THIRD.kv[val] === '微信' && <Icon type="wechat" style={{color:'green'}}/> }{T_THIRD ? '  '+T_THIRD.kv[val] : ''}</span>,row,index)
        },
      },
      {
        title: '项目',
        dataIndex: 'fTitle',
      },
      {
        title: '笔数',
        dataIndex: 'fCount',
        align:'right',
      },

      {
        title: '金额',
        dataIndex: 'fAmount',
        align:'right',
        render(val) {
          return val+'元';
        },
      },

      // {
      //   title: '对账时间',
      //   dataIndex: 'fDate',
      //   render: val => (
      //     <span>{(val && moment(val, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}</span>
      //   ),
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
    tradeSpace: 'tsettle',

    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace, rangePickerValue } = this.state;

    const date_start = moment(rangePickerValue[0]).format('YYYYMMDD');
    const date_end = moment(rangePickerValue[1]).format('YYYYMMDD');

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
        tradeCode: tradeSpace + '.selectSettle',
        date_start: date_start,
        date_end: date_end,
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
        tradeCode: tradeSpace + '.selectSettle',
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
        tradeCode: tradeSpace + '.selectSettle',
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
          tradeCode: tradeSpace + '.selectSettle',
        },
      });
    });
  };

  handleSettle = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { tradeSpace, rangePickerValue } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      // 处理起始日期
      let date_start = moment(rangePickerValue[0]).format('YYYYMMDD');
      let date_end = moment(rangePickerValue[1]).format('YYYYMMDD');

      const values = {
        ...fieldsValue,
        accDate: (fieldsValue.accDate && fieldsValue.accDate.format('YYYYMMDD')) || null,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'table/fetch',
        payload: {
          ...values,
          tradeCode: 'trans/settle',
          returnSelect: tradeSpace + '.selectSettle',
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
    const values = {
      ...fields,
      accDate: (fields.accDate && fields.accDate.format('YYYYMMDD')) || null,
    };

    this.setState({
      formValues: values,
    });

    dispatch({
      type: 'table/fetch',
      payload: {
        ...values,
        tradeCode: 'trans/settle',
        returnSelect: tradeSpace + '.selectSettle',
      },
      callback: () => {
        message.success('添加成功');
      },
    });

    this.handleModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { rangePickerValue,expandForm } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
          <Col md={14} sm={24}>
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
          <Col md={10} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                发起对账
              </Button>
              {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button> */}

              {
              !expandForm &&
              (<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
                </a>
              )
              }
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

    const { rangePickerValue,expandForm } = this.state;

    const { T_PAY_TYPE, T_THIRD,T_ORDER_TYPE,T_MERCHANT,T_CHANEL_TYPE } = table;

    return (
      <div>
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
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}  style={{marginTop: '20px'}}>
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
            <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                  发起对账
                </Button>
                {
                  expandForm &&
                  (
                  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                    收起 <Icon type="up" />
                  </a>
                  )
                }
              </span>
            </div>
          </Col>
        </Row>
      </Form>
      </div>
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

    const {
      modalVisible,
      addOrUpdate,
      tableRow,
    } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
      handleModalUpdate: this.handleModalUpdate,
    };

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* // to choose: 设置查询条件 */}
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator} />
            {/* <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns(table)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1000 }}
              bordered
            /> */}
            <Table
              columns={this.getColumns(table)}
              dataSource={data.list}
              bordered
              size="small"
              pagination={false}
            />
          </div>
        </Card>
        <CreateForm
          // to update: 中文翻译
          T_MERCHANT={table.T_MERCHANT}
          T_THIRD={table.T_THIRD}
          addOrUpdate={addOrUpdate}
          // record={(addOrUpdate === 2 && selectedRows[0]) || {}}
          record={(addOrUpdate === 2 && tableRow) || {}}
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}
