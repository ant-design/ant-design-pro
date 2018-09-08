import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {

  Tag,
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
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { getTimeDistance } from '../../../utils/utils';
import { formatMessage, FormattedMessage } from 'umi/locale';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

// const value = [0,1,2,3];
// let gradeName = '';
// value.forEach(element => {
//   gradeName += status[element]+',';
// });
// console.log(gradeName);

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
    T_INDUSTRY,

  } = props;

  // to update: 字段名，用于双向绑定数据
  const { fMerchantid, fOrdertrace, fChannel, fOperid, fTermid, fTermtrace,
    fRegdate, fRegtime, fOrdertype, fThirdid, fProduct,
    fPaytype, fTradetype, fStatus, fDepart,
    fYbflag, fOrderamt, fSettleamt, fBuyername, fBuyertel } = record;

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
      title={(addOrUpdate === 1 && '新建') || (addOrUpdate === 2 && '更新')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      {/* // to update: form表单内容，修改字段名称 */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fMerchantid', {
          initialValue: fMerchantid,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fOrdertrace', {
          initialValue: fOrdertrace,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fChannel', {
          initialValue: fChannel,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fOperid', {
          initialValue: fOperid,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fTermid', {
          initialValue: fTermid,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fTermtrace', {
          initialValue: fTermtrace,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fRegdate', {
          initialValue: fRegdate,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fRegtime', {
          initialValue: fRegtime,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fOrdertype', {
          initialValue: fOrdertype,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fThirdid', {
          initialValue: fThirdid,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fProduct', {
          initialValue: fProduct,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fPaytype', {
          initialValue: fPaytype,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fTradetype', {
          initialValue: fTradetype,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fStatus', {
          initialValue: fStatus,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fMerchantid', {
          initialValue: fMerchantid,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fDepart', {
          initialValue: fDepart,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fYbflag', {
          initialValue: fYbflag,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fOrderamt', {
          initialValue: fOrderamt,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fSettleamt', {
          initialValue: fSettleamt,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fBuyername', {
          initialValue: fBuyername,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fBuyertel', {
          initialValue: fBuyertel,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>



    </Modal>
  );
});

const orderStatus = { '0': '待创建', '1': '未支付', '2': '正在支付', '3': '已支付', '4': '已关闭', '5': '已退款' }

/* eslint react/no-multi-comp:0 */
@connect(({ table, loading }) => ({
  table,
  loading: loading.models.table,
}))
@Form.create()
export default class TableList extends PureComponent {
  getColumns = table => {
    // to update: 列名
    const { T_CHANEL_TYPE, T_ORDER_TYPE, T_THIRD, T_MERCHANT, T_PAY_TYPE } = table;
    return [
      {
        title: '订单创建日期',
        dataIndex: 'fRegdate',
        render: val => (
          <span>{(val && moment(val, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')) || '-'}</span>
        ),
      },
      {
        title: '付款人姓名',
        dataIndex: 'fBuyername',
      },
      {
        title: '付款人电话',
        dataIndex: 'fBuyertel',
      },
      {
        title: '商户号',
        dataIndex: 'fMerchantid',
        render(val) {
          return <span>{T_MERCHANT ? T_MERCHANT.kv[val] : ''}</span>;
        },
      },
      {
        title: '订单号',
        dataIndex: 'fOrdertrace',
      },
      {
        title: '登记途径',
        dataIndex: 'fChannel',
        render(val) {
          return <span>{T_CHANEL_TYPE ? T_CHANEL_TYPE.kv[val] : ''}</span>;
        },
      },
      {
        title: '操作人',
        dataIndex: 'fOperid',
      },
      {
        title: '终端号',
        dataIndex: 'fTermid',
      },

      {
        title: '终端流水号',
        dataIndex: 'fTermtrace',
      },
      {
        title: '科室',
        dataIndex: 'fDepart',
      },


      {
        title: '订单类型',
        dataIndex: 'fOrdertype',
        render(val) {
          return <span>{T_ORDER_TYPE ? T_ORDER_TYPE.kv[val] : ''}</span>;
        },
      },

      {
        title: '第三方',
        dataIndex: 'fThirdid',
        render(val) {
          return <span>{T_THIRD ? T_THIRD.kv[val] : ''}</span>;
        },
      },
      {
        title: '商品描述',
        dataIndex: 'fProduct',
      },
      {
        title: '支付类型',
        dataIndex: 'fPaytype',
        render(val) {
          return <span>{T_PAY_TYPE ? T_PAY_TYPE.kv[val] : ''}</span>;
        },
      },
      {
        title: '第三方交易类型',
        dataIndex: 'fTradetype',
      },
      {
        title: '医保标志',
        dataIndex: 'fYbflag',
      },

      {
        title: '订单金额',
        dataIndex: 'fOrderamt',
        render:
          val => val / 100 + '元',

      },
      {
        title: '付款金额',
        dataIndex: 'fSettleamt',
        render:
          val => val / 100 + '元',
      },
      {
        title: '订单状态',
        dataIndex: 'fStatus',
        render(val) {
          return <Tag>{orderStatus[val]}</Tag>;
        },
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
    tradeSpace: 'torder',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

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
        table: 'T_CHANEL_TYPE',
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { tradeSpace,rangePickerValue } = this.state;

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
        <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256, marginBottom: '24px' }}
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

    const { T_PAY_TYPE, T_THIRD, T_ORDER_TYPE, T_MERCHANT, T_CHANEL_TYPE } = table;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256, marginBottom: '24px' }}
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
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: '0px' }}>
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
            <FormItem label="登记途径">
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
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: '0px' }}>
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
            <FormItem label="订单状态">
              {getFieldDecorator(
                'fStatus'
              )(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                
                  <Option value="0">待创建</Option>
                  <Option value="1">未支付</Option>
                  <Option value="2">正在支付</Option>
                  <Option value="3">已支付</Option>
                  <Option value="4">未关闭</Option>
                  <Option value="5">已退款</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{
                // float: 'right',
                marginBottom: 24
              }}>
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
    console.log('----------',rangePickerValue);
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

    const {
      selectedRows,
      modalVisible,
      addOrUpdate,
      updateModalVisible,
      stepFormValues,
      tableRow,
    } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>

        {/* <Menu.Item key="approval">批量审批</Menu.Item> */}
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
      handleModalUpdate: this.handleModalUpdate,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* // to choose: 设置查询条件 */}
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns(table)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 2500 }}
            //  expandedRowRender={renderExpand}
            />
          </div>
        </Card>
        <CreateForm
          // to update: 中文翻译
          T_INDUSTRY={table.T_INDUSTRY}
          addOrUpdate={addOrUpdate}
          // record={(addOrUpdate === 2 && selectedRows[0]) || {}}
          record={(addOrUpdate === 2 && tableRow) || {}}
          {...parentMethods}
          modalVisible={modalVisible}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}
