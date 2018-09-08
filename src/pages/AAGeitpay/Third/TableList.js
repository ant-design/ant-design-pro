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
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        modalVisible,
        form,
        handleModalVisible,
        record,
        addOrUpdate,
        okHandle,
        onChange1,
        onChange2,
        onChange3,
        // to update: value to text的数据源，这里是表名
        // T_INDUSTRY,
      } = this.props;
      const { getFieldDecorator } = form;

      // to update: 字段名，用于双向绑定数据
      const { fThirdid, fName, fComm } = record;

      const value1 = (`${  fComm}`).substring(0, 1);
      const value2 = (`${  fComm}`).substring(1, 2);
      const value3 = (`${  fComm}`).substring(2, 3);
      const options = [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ];




      return (
        <Modal
          destroyOnClose
          title={(addOrUpdate === 1 && '新建') || (addOrUpdate === 2 && '更新')}
          visible={modalVisible}
          onOk={okHandle}
          onCancel={() => handleModalVisible()}
        >
          {/* // to update: form表单内容，修改字段名称 */}
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="第三方代码">
            {getFieldDecorator('fThirdid', {
              initialValue: fThirdid,
              rules: [
                { required: true, message: '请输入第三方代码' },
                { max: 2, message: '不超过2位' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="第三方名称">
            {getFieldDecorator('fName', {
              initialValue: fName,
              rules: [
                { required: true, message: '请输入第三方名称' },
                { max: 16, message: '不超过16位' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否联机">
            {getFieldDecorator(
              'fComm',
            )(
              <div>
                支付:  <RadioGroup options={options} onChange={onChange1} defaultValue={value1} /><br />
                退款:  <RadioGroup options={options} onChange={onChange2} defaultValue={value2} /><br />
                对账:  <RadioGroup options={options} onChange={onChange3} defaultValue={value3} />
              </div>
            )}
          </FormItem>
        </Modal>
      );
    }
  });


/* eslint react/no-multi-comp:0 */
@connect(({ table, loading }) => ({
  table,
  loading: loading.models.table,
}))
@Form.create()
export default class TableList extends PureComponent {
  getColumns = table => 
    // to update: 列名
    // const { T_INDUSTRY } = table;
     [
      {
        title: '第三方代码',
        dataIndex: 'fThirdid',
      },
      {
        title: '第三方名称',
        dataIndex: 'fName',
      },
      {
        title: '是否联机',
        dataIndex: 'fComm',
        render(val) {
          return <span>{['否', '是'][val]}</span>;
          // return <Badge status={statusMap[val]} text={status[val]} />;
        },
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
    ]
  ;

  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    addOrUpdate: 1,
    stepFormValues: {},
    fComm: {},

    // to update: tradeCode更新
    tradeSpace: 'tthird',

    value1: '1',
    value2: '2',
    value3: '3',

  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
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
        tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
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
        tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
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
            tradeCode: `${tradeSpace  }.deleteByPrimaryKey`,
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
        tradeCode: `${tradeSpace  }.deleteByPrimaryKey`,
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
        fThirdid: record.fThirdid,
        tradeCode: `${tradeSpace  }.deleteByPrimaryKey`,
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
          tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
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
      tableRow,
      addOrUpdate: 2,
      value1: tableRow.fComm.substring(0, 1),
      value2: tableRow.fComm.substring(1, 2),
      value3: tableRow.fComm.substring(2, 3),
    });
  };

  handleUpdate = (fieldsValue, record) => {
    const { dispatch } = this.props;
    const { tradeSpace, fComm } = this.state;
    console.log("------------", fieldsValue);
    console.log("------------", record);

    dispatch({
      type: 'table/update',
      payload: {
        ...record,
        ...fieldsValue,

        tradeCode: `${tradeSpace  }.updateByPrimaryKeySelective`,
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
        tradeCode: `${tradeSpace  }.insertSelective`,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };


  m = () => {
    const { value1, value2, value3, addOrUpdate } = this.state;
    const form = this.formRef.props.form;
    console.log(value1, value2, value3);
    form.validateFields((err, values) => {
      if (err) return;
      form.resetFields();
      console.log(value1, value2, value3);
      values.fComm = `${  value1  }${value2  }${value3}`;
      console.log('++========', values);

      if (addOrUpdate === 1) this.handleAdd(values);
      if (addOrUpdate === 2) this.handleUpdate(values);
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  onChange1 = (e) => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value,
    });
  }

  onChange2 = (e) => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      value2: e.target.value,
    });
  }

  onChange3 = (e) => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
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
      info,
    } = this.state;
    

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
      handleModalUpdate: this.handleModalUpdate,
      setState: this.setState,
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
          // T_INDUSTRY={table.T_INDUSTRY}
          wrappedComponentRef={this.saveFormRef}
          state={this.state}
          addOrUpdate={addOrUpdate}
          record={(addOrUpdate === 2 && tableRow) || {}}
          {...parentMethods}
          modalVisible={modalVisible}
          okHandle={this.m}
          onChange1={this.onChange1}
          onChange2={this.onChange2}
          onChange3={this.onChange3}
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
