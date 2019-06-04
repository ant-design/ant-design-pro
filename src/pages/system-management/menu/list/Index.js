import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  InputNumber,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Badge,
  Cascader,
  Popconfirm,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;


const CreateForm = Form.create()(props => {
  const { modalVisible, data, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!fieldsValue.pid) {
      } else {
        fieldsValue.pid = fieldsValue.pid[fieldsValue.pid.length - 1];
      }
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级菜单">
        {form.getFieldDecorator('pid', {
          rules: [
            {
              required: false,
              message: '请选择',
            },
          ],
        })(
          <Cascader
            style={{ width: '100%' }}
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            changeOnSelect
            options={data.list}
            placeholder="上级菜单"
            size="large"
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="菜单名称" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="路由地址">
        {form.getFieldDecorator('path', {
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="路由地址" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单图标">
        {form.getFieldDecorator('icon', {
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="菜单图标" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单序号">
        {form.getFieldDecorator('sort', {
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<InputNumber placeholder="菜单序号" style={{ width: '100%' }} size="large" />)}
      </FormItem>
    </Modal>
  );
});

const UpdateForm = Form.create()(props => {
  const { modalVisible, data, menu, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!fieldsValue.pid) {
      } else {
        fieldsValue.pid = fieldsValue.pid[fieldsValue.pid.length - 1];
      }
      fieldsValue.id = menu.id
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="编辑菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级菜单">
        {form.getFieldDecorator('pid', {
          initialValue: [menu.pid],
          rules: [
            {
              required: false,
              message: '请选择',
            },
          ],
        })(
          <Cascader
            style={{ width: '100%' }}
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            changeOnSelect
            options={data.list}
            placeholder="上级菜单"
            size="large"
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
        {form.getFieldDecorator('name', {
          initialValue: menu.name,
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="菜单名称" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="路由地址">
        {form.getFieldDecorator('path', {
          initialValue: menu.path,
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="路由地址" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单图标">
        {form.getFieldDecorator('icon', {
          initialValue: menu.icon,
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="菜单图标" size="large" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单序号">
        {form.getFieldDecorator('sort', {
          initialValue: menu.sort,
          rules: [
            {
              required: true,
              message: '请输入',
            },
          ],
        })(<InputNumber placeholder="菜单序号" style={{ width: '100%' }} size="large" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class MenuList extends PureComponent {

  state = {
    selectedRows: [],
    modalVisible: false,
    updateModalVisible: false,
    menu: {},
    expandForm: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
      payload: {},
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
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

    dispatch({
      type: 'menu/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = flag => {
    this.setState({
      updateModalVisible: !!flag,
    });
  };

  handleAdd = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/add',
      payload: values,
    });
    this.handleModalVisible()
  };

  handleEdit = record => {
    this.setState({ menu: record || {} });
    this.handleUpdateModalVisible(true);
  };

  handleEditSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/update',
      payload: values,
    });
    this.handleUpdateModalVisible()
  };

  handleDelete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/delete',
      payload: record.id,
    });
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'path',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '序号',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除此记录吗?"
            onConfirm={() => this.handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  render() {
    const {
      menu: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, menu } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateParentMethods = {
      handleAdd: this.handleEditSubmit,
      handleModalVisible: this.handleUpdateModalVisible,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" size="large" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>
            <StandardTable
              bordered
              rowKey="id"
              size="small"
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} data={data} />
        <UpdateForm {...updateParentMethods} modalVisible={updateModalVisible} data={data} menu={menu} />
      </PageHeaderWrapper>
    );
  }
}

export default MenuList;
