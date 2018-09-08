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
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
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
  const { fType, fIndustry, fProduct } = record;

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
      title={(addOrUpdate === 1 && '新建') || (addOrUpdate === 2 && '更新')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      {/* // to update: form表单内容，修改字段名称 */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型代码">
        {form.getFieldDecorator('fType', {
          initialValue: fType,
          rules: [{ required: true, message: '请输入类型id' }, { max: 7, message: '不超过7位' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="行业">
        {form.getFieldDecorator(
          'fIndustry',
          // f_SELECT && { initialValue: `${f_SELECT}`,
          {
            initialValue: fIndustry ? `${fIndustry}` : ``,
          }
        )(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {T_INDUSTRY
              ? T_INDUSTRY.tv.map(d => (
                  // <Option key={d.value} title={d.text}>
                  //   {d.text}
                  // </Option>

                  <Option value={d.value}>{d.text}</Option>
                ))
              : ''}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型名称">
        {form.getFieldDecorator('fProduct', {
          initialValue: fProduct,
          rules: [
            { required: true, message: '请输入类型名称' },
            { max: 42, message: '不超过42位' },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="监控对象">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">表一</Option>
              <Option value="1">表二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="规则模板">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="规则类型">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value="0">强</Radio>
              <Radio value="1">弱</Radio>
            </RadioGroup>
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          )}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入规则名称！' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="规则描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ table, loading }) => ({
  table,
  loading: loading.models.table,
}))
@Form.create()
export default class TableList extends PureComponent {
  getColumns = table => {
    // to update: 列名
    const { T_INDUSTRY } = table;
    return [
      {
        title: '类型代码',
        dataIndex: 'fType',
      },
      {
        title: '行业',
        dataIndex: 'fIndustry',
        render(val) {
          return <span>{T_INDUSTRY ? T_INDUSTRY.kv[val] : ''}</span>;
          // return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '类型名称',
        dataIndex: 'fProduct',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleModalUpdate(true, record)}>更新</a>

            <Divider type="vertical" />

            <Popconfirm title="确认删除吗?" onConfirm={this.handleDelete.bind(null, record)}>
              <a href="">删除</a>
            </Popconfirm>
          </Fragment>
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
    tradeSpace: 'tordertype',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    dispatch({
      type: 'table/fetchKV',
      payload: {
        tradeCode: 'selectKeyValue',
        key: 'F_CODE',
        value: 'F_NAME',
        table: 'T_INDUSTRY',
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
    const { tradeSpace } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: tradeSpace + '.selectByPrimaryKey',
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
        fType: record.fType,
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
    const { tradeSpace } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
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

  // handleUpdate = fields => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'table/update',
  //     payload: {
  //       name: fields.name,
  //       desc: fields.desc,
  //       key: fields.key,
  //       tradeCode: 'tordertype.updateByPrimaryKeySelective',
  //     },
  //   });

  //   message.success('配置成功');
  //   this.handleUpdateModalVisible();
  // };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* // to update: 更新查询form */}
          <Col md={8} sm={24}>
            <FormItem label="错误码">
              {getFieldDecorator('fErrno')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="错误描述">
              {getFieldDecorator('fErrmsg')(<Input placeholder="请输入" />)}
            </FormItem>
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
            <FormItem label="字符串">
              {getFieldDecorator('f_CHAR')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="下拉框">
              {getFieldDecorator('f_SELECT')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="数字">
              {getFieldDecorator('f_NUMBER')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('f_DATE')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('date_start')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入开始日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('date_end')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入结束日期" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
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
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

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
            {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {/* {selectedRows.length === 1 && (
                <span>
                  <Button icon="edit" onClick={() => this.handleModalUpdate(true, selectedRows[0])}>
                    更新
                  </Button>
                </span>
              )} */}
              {/* {selectedRows.length > 0 && (
                <span>
                  <Popconfirm title="确认删除吗?" onConfirm={this.handleDeleteBatch}>
                    <Button>删除</Button>
                  </Popconfirm>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )} */}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns(table)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
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
