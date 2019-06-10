/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { PureComponent, Fragment } from 'react';
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
  DatePicker,
  Select,
  InputNumber,
  Radio,
  // Popconfirm,
  Drawer,
} from 'antd';
import Ellipsis from '@/components/Ellipsis';
import moment from 'moment'; // 不能用｛moment｝
import StandardTable from '@/components/StandardTable';
import Detail from './Detail';
import styles from './index.less';

import PrivilegeTreeSelectView from '@/pages/UserManager/PrivilegeTreeSelectView';

const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;
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
const menuOption = [['remove', '删除'], ['enable', '激活'], ['disable', '停用']];
const QueryCommandChildren = [];
const otherChildren = [];
const CreateForm = Form.create()(props => {
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible } = props;
  // console.log('1 selectedRow in CreateForm :', selectedRow);
  const {
    columnSchemas: { key },
  } = props;
  const okHandle = () => {
    // console.log('okHandle1');
    form.validateFields((err, fieldsValue) => {
      // console.log('okHandle2',fieldsValue);
      if (err) return;
      Modal.confirm({
        title: '',
        content: '确定提交该记录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => handleAdd(fieldsValue, form),
      });
      // handleAdd(fieldsValue, form);
    });
  };
  const cancelHandle = (row, flag) => {
    form.resetFields();
    handleModalVisible(row, flag);
  };
  const renderAutoForm = item => {
    switch (item.tag) {
      case 'commonSelect':
        return (
          <Select style={{ width: '100%' }}>
            {item.enumData.map(d => (
              <Option key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Option>
            ))}
          </Select>
        );
      case 'commonRadio':
        return (
          <RadioGroup style={{ width: '100%' }}>
            {item.enumData.map(d => (
              <Radio key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Radio>
            ))}
          </RadioGroup>
        );
      case 'privilegeTreeSelect':
        return <PrivilegeTreeSelectView style={{ width: '100%' }} />;
      case 'textArea':
        return <TextArea rows={item.rows} />;
      case 'inputNumber':
        return <InputNumber style={{ width: '100%' }} />;
      case 'passwordTag':
        return <Password style={{ width: '100%' }} />;
      default:
        return <Input disabled={item.disabled} placeholder={`请输入${item.title}`} />;
    }
  };
  const addForms = getFormItemArray(props, 'add')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      // console.log("======:",itemTemp.name === key,key,itemTemp.name);
      itemTemp.disabled = itemTemp.name === key;
      return itemTemp;
    });
  // console.log('addForm:', addForms);
  const modalTitle = selectedRow ? 'update' : 'new';
  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => cancelHandle()}
    >
      {addForms.map(item => (
        <FormItem
          key={`addFormItem-${item.name}`}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label={item.title}
          style={{ height: `${item.rows ? 20 * item.rows : 20}px` }}
        >
          {form.getFieldDecorator(item.name, {
            initialValue: selectedRow ? selectedRow[item.name] : '',
            rules: item.rules ? [] : [{ required: true, message: `Please input ${item.title}` }],
          })(renderAutoForm(item))}
        </FormItem>
      ))}
    </Modal>
  );
});
@Form.create()
class QueryTable extends PureComponent {
  state = {
    modalVisible: false,
    drawerVisible: false,
    expandForm: false,
    selectedRows: [],
    selectedRow: {},
    formValues: {},
  };

  componentDidMount() {
    // console.log('============sub componentDidMount========');

    const { children } = this.props;
    QueryCommandChildren.splice(0, QueryCommandChildren.length);
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.name === 'QueryCommand') {
        QueryCommandChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });

    this.handleColumn();
  }

  handleDetail=(record)=>{
    this.handleDrawerVisible(record,true);
  }

  onDrawerClose=()=>{
    this.handleDrawerVisible(null,false);
  }

  // get columns
  handleColumn = () => {
    columns = [];
    const {
      columnSchemas: { columnDetails, actions },
    } = this.props;

    // const {commands} = columnDetails;
    columnDetails.map(columnDetail => {
      const obj = {};
      if (columnDetail && columnDetail.columnHidden) {
        return obj;
      }
      obj.title = columnDetail.title;
      obj.width = columnDetail.width || undefined;
      obj.dataIndex = columnDetail.name;
      obj.showLen = columnDetail.showLen || undefined;
      if (columnDetail.sorter != null) {
        obj.sorter = columnDetail.sorter;
      }
      if(columnDetail.detailFlag){
        obj.render = (val,record) => (<a onClick={() => this.handleDetail(record)}>{val}</a>);
      }
      else if (columnDetail.format != null) {
        obj.render = val => <span>{moment(val).format(columnDetail.format)}</span>;
      } else if (columnDetail.showLen !== undefined) {
        obj.render = val => (
          <Ellipsis length={columnDetail.showLen} tooltip>
            {val}
          </Ellipsis>
        );
      } else if (columnDetail.enumData != null) {
        obj.render = val => {
          const item = columnDetail.enumData.find(d => d.itemCode === val);
          const itemValue = item ? item.itemValue : '';
          return <span>{itemValue}</span>;
        };
      }
      columns.push(obj);
      return obj;
    });
    if (actions) {
      if (actions.havePermissions) {
        const authQueryCommands = actions.commandAct ? QueryCommandChildren : [];
        columns.push({
          title: actions.title || 'action',
          width: actions.width || 130,
          render: (text, row) => (
            <Fragment>
              <a onClick={() => this.handleModify(row, true)}>{actions.saveAct}</a>
              {authQueryCommands}
            </Fragment>
          ),
        });
      }
    } else {
      columns.push({
        title: '操作',
        width: 130,
        render: (text, row) => (
          <Fragment>
            <a onClick={() => this.handleModify(row, true)}>修改</a>
            {QueryCommandChildren}
          </Fragment>
        ),
      });
    }
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
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'uniComp/list',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(rows);
    }
  };

  handleSearch = e => {
    // console.log('ddd---------2');
    const { onSearch, form } = this.props;
    if (e) e.preventDefault();

    const {
      columnSchemas: { tableName },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      // console.log('---fieldsValue:', fieldsValue);
      if (err) return;
      const { searchForm } = fieldsValue;
      const values = {
        tableName,
        ...searchForm,
      };
      this.setState({
        formValues: values,
      });
      if (onSearch) {
        onSearch(values);
      }
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {
    const {
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
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // console.log('---params:', params);
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(params);
    }
  };

  handleCallback = addForm => {
    // console.log('resp=======', resp);
    addForm.resetFields();
    this.setState({
      modalVisible: false,
      selectedRow: null,
    });
    // console.log('ddd---------1');
    this.handleSearch();
  };

  handleAdd = (fields, addForm) => {
    // console.log('handleAdd:',fields);
    const {
      columnSchemas: { tableName, key },
    } = this.props;

    const { selectedRow } = this.state;
    const option = selectedRow ? 2 : 1;
    const keyValue = selectedRow ? selectedRow[key] : null;
    const payload = { option, tableName, ...fields };
    payload[key] = keyValue;

    const { onAdd } = this.props;
    if (onAdd) {
      onAdd(payload, addForm, this.handleCallback);
    }
  };

  handleMenuClick = e => {
    const value = new Map(menuOption).get(e.key);
    Modal.confirm({
      title: '',
      content: `确定${value}该记录吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.subHandleMenuClick(e),
    });
  };

  subHandleMenuClick = e => {
    const {
      onMenuClick,
      columnSchemas: { tableName, key },
    } = this.props;
    // console.log(tableName);
    const { selectedRows } = this.state;
    // console.log('-----:', selectedRows);
    if (!selectedRows) return;
    const payload = {
      tableName,
      ids: selectedRows.map(row => row[key]), // .join(','),
    };
    switch (e.key) {
      case 'remove':
        payload.option = 3;
        break;
      case 'enable':
        payload.option = 4;
        break;
      case 'disable':
        payload.option = 5;
        break;
      default:
        break;
    }
    if (onMenuClick) {
      onMenuClick(payload, () => {
        this.setState({
          selectedRows: [],
        });
        this.handleSearch();
      });
    }
  };

  handleFormReset = () => {
    const { form, onSearch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      modalVisible: false,
    });

    const {
      columnSchemas: { tableName },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { searchForm } = fieldsValue;
      const values = {
        tableName,
        ...searchForm,
      };
      this.setState({
        formValues: values,
      });
      if (onSearch) {
        onSearch(values);
      }
    });
  };

  handleModify = (row, flag) => {
    // console.log('modify===:', flag, this.props, form.getFieldsValue());
    // form.setFieldsValue({orgId: "f", orgCode: "f", name: "f"});
    this.handleModalVisible(row, flag);
  };

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: !!flag,
      selectedRow: row,
    });
  };

  handleDrawerVisible = (row, flag) => {
    this.setState({
      drawerVisible: !!flag,
      selectedRow: row,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  renderSimpleForm() {
    const { form } = this.props;
    // console.log(tableName, key, name);
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
              <FormItem key={`form-item-${item.name}`} label={item.title}>
                {getFieldDecorator(`searchForm.${item.name}`)(
                  item.tag === 'commonSelect' ? (
                    <Select key={`ele-${item.name}`} style={{ width: 100 }}>
                      {item.enumData.map(d => (
                        <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                          {d.itemValue}
                        </Option>
                      ))}
                    </Select>
                  ) : item.tag === 'date' ? (
                    <DatePicker
                      key={`ele-${item.name}`}
                      style={{ width: '100%' }}
                      placeholder="请输入更新日期"
                    />
                  ) : (
                    <Input key={`ele-${item.name}`} placeholder="请输入" />
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
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {queryForms.splice(0, 3).map(item => (
          <Col key={`col-${item.name}`} md={8} sm={24}>
            <FormItem key={`form-item-${item.name}`} label={item.title}>
              {getFieldDecorator(`searchForm.${item.name}`)(
                item.tag === 'commonSelect' ? (
                  <Select key={`ele-${item.name}`} style={{ width: 100 }}>
                    {item.enumData.map(d => (
                      <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                        {d.itemValue}
                      </Option>
                    ))}
                  </Select>
                ) : item.tag === 'date' ? (
                  <DatePicker
                    key={`ele-${item.name}`}
                    style={{ width: '100%' }}
                    placeholder="请输入更新日期"
                  />
                ) : (
                  <Input key={`ele-${item.name}`} placeholder="请输入" />
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
    const { data, loading, columnSchemas, onRow, size } = this.props;
    const { key,actions } = columnSchemas;
    const { selectedRow, selectedRows, modalVisible,drawerVisible } = this.state;
    console.log("-----:",actions,actions&&!actions.haveAddPermissions);
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        {menuOption.map(item => (
          <Menu.Item key={item[0]}>{item[1]}</Menu.Item>
        ))}
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
          <div className={styles.tableListOperator} style={actions&&!actions.haveAddPermissions?{display:'none'}:{}}>
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
            onChange={this.handleTableChange}
            onRow={onRow}
            size={size}
          />
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          selectedRow={selectedRow}
          columnSchemas={columnSchemas}
        />
        <Drawer
          width={640}
          placement="right"
          closable
          onClose={this.onDrawerClose}
          visible={drawerVisible}
        >
          <Detail
            selectedRow={selectedRow}
            columnSchemas={columnSchemas}
          />
        </Drawer>
      </Card>
    );
  }
}
export default QueryTable;
