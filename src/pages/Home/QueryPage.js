/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button, DatePicker, Row, Col, Icon, Input, Form, Select, Badge, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import moment from 'moment';
import StandardTable from '@/components/StandardTable';
import styles from './QueryPage.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const costMap = ['input', 'output'];
const cost = ['收入', '支出'];

const buyMap = ['transfer', 'consume', 'charge'];
const buy = ['转账', '消费', '系统充值'];

Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
@connect(({ netbar, loading }) => {
  console.log('connect: ', '  netbar: ', netbar, '  loading: ', loading);
  return {
    netbar,
    loading: loading.models.netbar,
  };
})
@Form.create()
class QueryPage extends Component {
  state = {
    selectedRows: [],
    expandForm: false,
    formValues: {},
    time: [undefined, undefined],
  };

  columns = [
    {
      title: '日期',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '收支',
      dataIndex: 'budget',
      filters: [
        {
          text: cost[0],
          value: 0,
        },
        {
          text: cost[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={costMap[val]} text={cost[val]} />;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      filters: [
        {
          text: buy[0],
          value: 0,
        },
        {
          text: buy[1],
          value: 1,
        },
        {
          text: buy[2],
          value: 2,
        },
      ],
      render(val) {
        return <Badge status={buyMap[val]} text={buy[val]} />;
      },
    },
    {
      title: '对方QQ',
      dataIndex: 'qqno',
    },
    {
      title: '交易额',
      dataIndex: 'callNo',
      sorter: true,
    },
    {
      title: '备注',
      dataIndex: 'detail',
    },
    {
      title: '积分余额',
      dataIndex: 'scoreleft',
      sorter: true,
    },
  ];

  componentDidMount() {
    console.log('componentDidMount');
    const { dispatch } = this.props;
    console.log('componentDidMount： ', this.props);
    dispatch({
      type: 'netbar/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log('handleStandardTableChange enter');
    console.log('pagination', pagination, ' filtersArg', filtersArg, ' sorter: ', sorter);
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
    console.log('params: ', params);
    dispatch({
      type: 'netbar/fetch',
      payload: params,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { time } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('fieldsValue: ', fieldsValue);
      const values = {
        // eslint-disable-next-line object-shorthand
        begintime: time[0],
        // eslint-disable-next-line object-shorthand
        endtime: time[1],
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'netbar/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      time: [undefined, undefined],
    });
    // console.log('picker: ', this.picker);
    dispatch({
      type: 'netbar/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    console.log('handleSelectRows enter: ', rows);
    this.setState({
      selectedRows: rows,
    });
  };

  onChange = dates => {
    const { dispatch, form } = this.props;
    // console.log("dates:", dates, "datestring: ", dateStrings);
    console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('fieldsValue: ', fieldsValue);
      const values = {
        begintime:
          dates[0] !== undefined ? dates[0].unix(Number) : moment('1977-12-25').unix(Number),
        endtime: dates[1] !== undefined ? dates[1].unix(Number) : moment('2995-12-25').unix(Number),
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
        time: [
          dates[0] !== undefined ? dates[0] : moment('1977-12-25'),
          dates[1] !== undefined ? dates[1] : moment('2995-12-25'),
        ],
      });

      dispatch({
        type: 'netbar/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    console.log('renderSimpleForm this.props: ', this.props);
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="QQ">
              {getFieldDecorator('qqno')(<Input type="number" placeholder="请输入查询QQ号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="收支">
              {getFieldDecorator('budget')(
                <Select placeholder="请选择收支类型" style={{ width: '100%' }}>
                  <Option value="0">收入</Option>
                  <Option value="1">支出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">转账</Option>
                  <Option value="1">消费</Option>
                  <Option value="2">系统充值</Option>
                </Select>
              )}
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
    console.log('renderAdvancedForm this.props: ', this.props);
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { time } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="QQ">
              {getFieldDecorator('qqno')(<Input type="number" placeholder="请输入查询QQ号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="收支">
              {getFieldDecorator('budget')(
                <Select placeholder="请选择收支类型" style={{ width: '100%' }}>
                  <Option value="0">收入</Option>
                  <Option value="1">支出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">转账</Option>
                  <Option value="1">消费</Option>
                  <Option value="2">系统充值</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="交易额>=">
              {getFieldDecorator('callNomin')(
                <Input type="number" placeholder="请输入查询最小值，默认为0" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="交易额<=">
              {getFieldDecorator('callNomax')(
                <Input type="number" placeholder="请输入查询最大值，默认为MAX" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="积分余额>=">
              {getFieldDecorator('scoreleftmin')(
                <Input type="number" placeholder="请输入查询最小值，默认为0" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="积分余额<=">
              {getFieldDecorator('scoreleftmax')(
                <Input type="number" placeholder="请输入查询最大值，默认为MAX" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="备注">
              {getFieldDecorator('detail')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="起止日期">
              <RangePicker
                // eslint-disable-next-line no-return-assign
                value={time}
                ranges={{
                  今天: [moment().startOf('day'), moment().endOf('day')],
                  本月: [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                // eslint-disable-next-line react/jsx-boolean-value
                onOk={this.onChange}
              />
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </div>
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

  render() {
    const {
      netbar: { data },
      loading,
    } = this.props;
    console.log('data -- render: ', data);
    console.log('this.props', this.props);
    // eslint-disable-next-line no-unused-vars
    const { selectedRows, expandForm } = this.state;
    return (
      <PageHeaderWrapper title="查询">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className="pagewrap">
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default QueryPage;
