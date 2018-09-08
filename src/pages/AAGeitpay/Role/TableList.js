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
  Table,
  Tree,
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


import styles from './TableList.less';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
    // T_INDUSTRY,
    menu,
    onCheck,
  } = props;

  // to update: 字段名，用于双向绑定数据
  const { fId, fName, fDesc, fMenuidList } = record;

  const getMDate = date => {
    if (date) return moment(date);
    return moment();
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (addOrUpdate === 1) handleAdd(fieldsValue);
      if (addOrUpdate === 2) handleUpdate(fieldsValue, record);
    });
  };

  const renderTree = (data,idx) =>data.map(item => {
      if (!item.routes) {
        return (
          <TreeNode title={item.namezh} key={item.id} />
        )
      } 
        return (
          <TreeNode title={item.namezh} key={item.id}>
            {renderTree(item.routes)}
          </TreeNode>
        )
      
    });
  // console.log('%o',renderTree(menu.data.list));

  const array = (`${fMenuidList}`).split(',');
  const defaultCheckedKeys = [];
  array.forEach(element => {
    defaultCheckedKeys.push(Number(element));
  });
  console.log('%o',defaultCheckedKeys);

  return (
    <Modal
      destroyOnClose
      title={(addOrUpdate === 1 && '新建') || (addOrUpdate === 2 && '更新')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={800}
    >
      <Row>
        <Col span={12}>
          {/* // to update: form表单内容，修改字段名称 */}
          {addOrUpdate === 2 ? (
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="id">
              {form.getFieldDecorator('fId', {
            initialValue: fId,
          })(<Input placeholder="请输入" disabled="true" />)}
            </FormItem>
      ) : null}
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名称">
            {form.getFieldDecorator('fName', {
          initialValue: fName,
          rules: [
            { required: true, message: '请输入角色名称' },
            { max: 33, message: '不超过33位' },
          ],
        })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="说明">
            {form.getFieldDecorator('fDesc', {
          initialValue: fDesc,
          rules: [{ max: 33, message: '不超过33位' }],
        })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 5}} wrapperCol={{ span: 15 }} label="菜单">
            <Tree
              checkable
              defaultExpandedKeys={[]}
              defaultSelectedKeys={[]}
              defaultCheckedKeys={defaultCheckedKeys}
              onCheck={onCheck}
              defaultExpandAll
            >
              {menu.data && renderTree(menu.data.list)}
            </Tree>
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ table, loading, menu }) => ({
  table,
  menu,
  loading: loading.models.table,
}))
@Form.create()
export default class TableList extends PureComponent {

  getColumns = table => 
    // to update: 列名
     [
      {
        title: 'id',
        dataIndex: 'fId',
      },
      {
        title: '名称',
        dataIndex: 'fName',
        sorter: true,
      },
      {
        title: '说明',
        dataIndex: 'fDesc',
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

    // to update: tradeCode更新
    tradeSpace: 'trole',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    dispatch({
      type: 'menu/fetch',
      payload: {
        tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
        type: 'menu',
      },
    });

    dispatch({
      type: 'table/fetch',
      payload: {
        tradeCode: `${tradeSpace  }.selectByPrimaryKey`,
      },
    });
  }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'table/clean',
  //   })
  // };

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

        // to update:tradeCode更新
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
        // to update:tradeCode更新
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
            // to update:tradeCode更新
            fErrnoList: selectedRows.map(row => row.fErrno).join(','),
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
        // to update:tradeCode更新
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
        fId: record.fId,
        tradeCode: `${tradeSpace  }.deleteByPrimaryKey`,
        type: 'role',
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

          // to update:tradeCode更新
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
      fMenuid: tableRow.fMenuidList,
      toList: 'fMenuid',
    });
  };

  handleUpdate = (fields, record) => {
    const { dispatch } = this.props;
    const { tradeSpace,fMenuid,toList } = this.state;

    console.log({fMenuid,toList});
    dispatch({
      type: 'table/update',
      payload: {
        ...record,
        ...fields,
        // f_DATE: fields.f_DATE.format('YYYYMMDD'),
        // to update:tradeCode更新
        tradeCode: `${tradeSpace  }.updateByPrimaryKeySelective`,
        type: 'role',
        fMenuid,
        toList,
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
    const { tradeSpace,fMenuid,toList } = this.state;
    dispatch({
      type: 'table/add',
      payload: {
        ...fields,
        // f_DATE: fields.f_DATE.format('YYYYMMDD'),
        // to update:tradeCode更新
        tradeCode: `${tradeSpace  }.insertSelective`,
        type: 'role',
        fMenuid,
        toList,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

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

  onCheck = (checkedKeys, info) => {
    this.setState({
      fMenuid: checkedKeys.join(','),
      toList: 'fMenuid',
    });
    console.log('onCheck', checkedKeys, info);
  }


  render() {
    const {
      table: { data },
      table,
      menu,
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
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
      handleModalUpdate: this.handleModalUpdate,
      onCheck: this.onCheck,
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
          menu={menu}

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
