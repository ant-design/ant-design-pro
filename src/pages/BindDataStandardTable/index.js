/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment'; // 不能用｛moment｝
import StandardTable from '@/components/StandardTable';
import BindDataSelect from '../UniComp/BindDataSelect';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
let columns = [];
/**
 * get form item array for query condition form and add(modify) form
 * @param currentProps
 * @param type include:query, add
 * @returns {Array}
 */
const getFormItemArray = (currentProps, type) => {
  const {
    columnSchemas: { columnDetails },
  } = currentProps;
  return columnDetails.filter(columnDetail => columnDetail[type]);
};
const CreateForm = Form.create()(props => {
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible } = props;
  console.log('1 selectedRow in CreateForm :', selectedRow);
  const {
    columnSchemas: { tableName, key, name },
  } = props;
  const okHandle = () => {
    console.log('okHandle');
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };
  const cancelHandle = (row, flag) => {
    form.resetFields();
    handleModalVisible(row, flag);
  };
  const addForms = getFormItemArray(props, 'add')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      itemTemp[name] === key ? (itemTemp.disabled = true) : (itemTemp.disabled = false);
      return itemTemp;
    });
  console.log('addForm:', addForms);
  return (
    <Modal title="新增" visible={modalVisible} onOk={okHandle} onCancel={() => cancelHandle()}>
      {addForms.map(item => (
        <FormItem
          key={`addFormItem-${item.name}`}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label={item.title}
        >
          {form.getFieldDecorator(item.name, {
            initialValue: selectedRow ? selectedRow[item.name] : '',
            rules:
              item[name] === key
                ? []
                : [{ required: true, message: 'Please input some description...' }],
          })(
            item.tag === 'select' ? (
              <BindDataSelect
                placeholder={`请输入${item.title}`}
                tableName={tableName}
                tableKey={key}
                tableTitle={name}
              />
            ) : item.tag === 'commonSelect' ? (
              <Select style={{ width: 100 }}>
                {item.enumData.map(d => (
                  <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                    {d.itemValue}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input disabled={item.disabled} placeholder={`请输入${item.title}`} />
            )
          )}
        </FormItem>
      ))}
    </Modal>
  );
});
@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
@Form.create()
class BindDataStandardTable extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    selectedRow: {},
    formValues: {},
  };

  componentWillMount() {
    console.log('============1componentWillMount========', this.props);
    const {
      uniComp: { data },
    } = this.props;
    if (data && data.list) {
      data.list = [];
    }
  }

  componentDidMount() {
    console.log('============2componentDidMount========');
    const {
      dispatch,
      columnSchemas: { tableName },
    } = this.props;
    this.handleColumn();
    dispatch({
      type: 'uniComp/fetch',
      payload: { tableName },
    });
  }

  // get columns
  handleColumn = () => {
    columns = [];
    const {
      columnSchemas: { columnDetails },
    } = this.props;
    columnDetails.map(columnDetail => {
      const obj = {};
      if (columnDetail && columnDetail.columnHidden) {
        return obj;
      }
      obj.title = columnDetail.title;
      obj.dataIndex = columnDetail.name;
      if (columnDetail.sorter != null) {
        obj.sorter = columnDetail.sorter;
      }
      if (columnDetail.format != null) {
        obj.render = val => <span>{moment(val).format(columnDetail.format)}</span>;
      }
      if (columnDetail.enumData != null) {
        obj.render = val => (
          <span>{columnDetail.enumData.find(d => d.itemCode === val).itemValue}</span>
        );
      }
      columns.push(obj);
      return obj;
    });
    columns.push({
      title: '操作',
      render: (text, row) => (
        <Fragment>
          <a onClick={() => this.handleModify(row, true)}>修改</a>
        </Fragment>
      ),
    });
    return columns;
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {
      dispatch,
      columnSchemas: { tableName },
    } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      tableName,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'uniComp/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    if (e) e.preventDefault();

    const {
      dispatch,
      form,
      columnSchemas: { tableName },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // console.log("handlesearch",fieldsValue);
      const values = {
        tableName,
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'uniComp/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const {
      form,
      dispatch,
      columnSchemas: { tableName },
    } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      modalVisible: false,
    });
    dispatch({
      type: 'uniComp/fetch',
      payload: { tableName },
    });
  };

  handleModify = (row, flag) => {
    const { form } = this.props;
    console.log('modify===:', flag, this.props, form.getFieldsValue());
    // form.setFieldsValue({orgId: "f", orgCode: "f", name: "f"});
    this.handleModalVisible(row, flag);
  };

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: !!flag,
      selectedRow: row,
    });
  };

  handleAdd = (fields, addForm) => {
    console.log('handleAdd');
    const {
      dispatch,
      columnSchemas: { tableName },
    } = this.props;
    dispatch({
      type: 'uniComp/add',
      payload: { tableName, ...fields },
      callback: resp => {
        console.log('resp=======', resp);
        if (resp.code === 200) {
          message.success('提交成功');
          addForm.resetFields();
          this.setState({
            modalVisible: false,
            selectedRow: null,
          });
        } else {
          message.error('提交失败');
        }
      },
    });

    dispatch({
      type: 'uniComp/fetch',
      payload: { tableName },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const {
      dispatch,
      columnSchemas: { tableName },
    } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'uniComp/remove',
          payload: {
            tableName,
            id: selectedRows.map(row => row.id).join(','),
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
    this.handleSearch();
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  renderSimpleForm() {
    const { form, columnSchemas } = this.props;
    const { tableName, key, name } = columnSchemas;
    console.log(tableName, key, name);
    const { getFieldDecorator } = form;
    const queryForms = getFormItemArray(this.props, 'query');
    const simpleQueryForms = queryForms.splice(
      0,
      queryForms && queryForms.length > 1 ? 2 : queryForms.length
    );
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {simpleQueryForms.map(item => (
            <Col key={`col-${item.name}`} md={8} sm={24}>
              <FormItem key={`formitem-${item.name}`} label={item.title}>
                {getFieldDecorator(item.name)(
                  item.tag === 'select' ? (
                    <BindDataSelect
                      placeholder="请输入"
                      tableName={tableName}
                      tableKey={key}
                      tableTitle={name}
                    />
                  ) : item.tag === 'date' ? (
                    <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                  ) : (
                    <Input placeholder="请输入" />
                  )
                )}
              </FormItem>
            </Col>
          ))}
          <Col md={8} sm={24}>
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

  renderTForm = (queryForms, currentForm) => {
    const { getFieldDecorator } = currentForm;

    const { columnSchemas } = this.props;
    const { tableName, key, name } = columnSchemas;
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {queryForms.splice(0, 3).map(item => (
          <Col key={`col-${item.name}`} md={8} sm={24}>
            <FormItem key={`formitem-${item.name}`} label={item.title}>
              {getFieldDecorator(item.name)(
                item.tag === 'select' ? (
                  <BindDataSelect
                    placeholder="请输入"
                    tableName={tableName}
                    tableKey={key}
                    tableTitle={name}
                  />
                ) : item.tag === 'commonSelect' ? (
                  <Select style={{ width: 100 }}>
                    {item.enumData.map(d => (
                      <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                        {d.itemValue}
                      </Option>
                    ))}
                  </Select>
                ) : item.tag === 'date' ? (
                  <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                ) : (
                  <Input placeholder="请输入" />
                )
              )}
            </FormItem>
          </Col>
        ))}
      </Row>
    );
  };

  renderAdvancedForm() {
    // const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    const queryForms = getFormItemArray(this.props, 'query');
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {this.renderTForm(queryForms, form)}
        {this.renderTForm(queryForms, form)}
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

  render() {
    const {
      uniComp: { data },
      loading,
      columnSchemas,
    } = this.props;
    const { key } = columnSchemas;
    const { selectedRow, selectedRows, modalVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="exportRemove">导出删除脚本</Menu.Item>
        <Menu.Item key="exportCreate">导出创建脚本</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(null, true)}>
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
            selectedRows={selectedRows}
            rowKey={key}
            loading={loading}
            data={data}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          selectedRow={selectedRow}
          columnSchemas={columnSchemas}
        />
      </Card>
    );
  }
}
export default BindDataStandardTable;
