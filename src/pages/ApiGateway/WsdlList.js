import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Alert,
  Upload,
  Icon,
  Modal,
  Divider,
  message,
  Dropdown,
  Menu
} from 'antd';
import pathToRegexp from 'path-to-regexp';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';
import WsdlUpload from "./WsdlUpload";

import styles from './ApiList.less';
import {getItems} from '@/utils/masterData';
import {getUserId} from "../../utils/authority";
import constants from '@/utils/constUtil';

import reqwest from 'reqwest';

const { PREFIX_PATH,TOKEN_PREFIX,ACT,STATUS } = constants;

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


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
// 定义编辑页面
const CreateForm = Form.create()(props => {
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible,handleFile } = props;
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
        content: 'Do you submit？',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: () => handleAdd(fieldsValue, form),
      });
    });
  };
  const cancelHandle = (row, flag) => {
    form.resetFields();
    handleModalVisible(row, flag);
  };

  const renderAutoForm = (item) => {

    // let folder = '';
    // if( selectedRow ){
    //   folder = selectedRow.wsdlPath;
    // }

    switch (item.tag) {
      case 'fileUpload':
        return (
          <WsdlUpload selectedRow={selectedRow} handleFile={handleFile} />
        );
      default:
        return <Input disabled={item.disabled} placeholder={`Please input ${item.title}`} />;
    }
  };
  const addForms = getFormItemArray(props, 'add')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      // console.log("======:",itemTemp.name === key,key,itemTemp.name);
      itemTemp.disabled = itemTemp.name === key||itemTemp.disabledAct==='true';
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
      <div>
        {addForms.map(item => (
          <FormItem
            key={`addFormItem-${item.name}`}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label={item.title}
          >
            {form.getFieldDecorator(item.name, {
              initialValue: selectedRow ? selectedRow[item.name] : item.defaultValue||'',
              rules: item.rules ? [] : [{ required: true, message: `Please input ${item.title}` }],
            })(renderAutoForm(item))}
          </FormItem>
      ))}
      </div>
    </Modal>
  );

});

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    totalList.push({ ...column, total: 0 });
  });
  return totalList;
}

/* eslint react/no-multi-comp:0 */
@connect(({wsdlModel, loading}) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
@Form.create()
class WsdlList extends PureComponent {

  state = {
    selectedRow: {},
    selectedRowKeys:[],
    formValues: {},
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    list:[],
    filtersArg: {},
    sorter: {},
    logList: [],
    selectedRows: [],
    needTotalList:[],
    modalVisible:false,
    fileList: [],
    columnSchemas:{},
  };

  componentWillMount() {
    const {dispatch} = this.props;

    const columnSchemas = {
      key: 'wsdlId',
      name: 'wsdlId',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'wsdlId', title: 'Wsdl Id', add: true, disabledAct:'true' },
        { name: 'wsdlUrl', title: 'Wsdl Url', sorter: true, query: true, add: true, detailFlag:1 },
        { name: 'wsdlPath', title: 'Wsdl Path', sorter: true, query: true, detailFlag:1 },
        { name: 'wsdlFileName', title: 'Wsdl File Name',tag:'fileUpload',columnHidden: true, add: true,rows:3,rules:[] },
      ]

    };
    this.setState({columnSchemas});

    const userId = getUserId();
    const range = "all";
    const payload = {
      userId,
      range,
      data:{
        info:{
          pageNo: 1,
          pageSize: 10
        }
      }
    };
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        console.log("callback",resp)
        const {data} = resp;
        const { page,records } = data;
        const needTotalList = initTotalList(records);
        this.setState({
          needTotalList,
          pagination:page,
          list:records
        });
      }
    });

  }

  getOptionMaster(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  getRowByKey(key, newData) {
    const {logList} = this.state;
    return (newData || logList).filter(item => item.orderId === key)[0];
  }


  getOption(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  /**
   * {status: Array(2)} 转化为{status: "1,2"}
   */
  conversionFilter = filtersArg => {
    return Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
  };


  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };


  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    const userId = getUserId();
    const range = "all";
    const payload = {
      userId,
      range,
      data: {
        info: {
          pageNo: 1,
          pageSize: 10
        }
      }
    };
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        const {data} = resp;
        const { page,records } = data;
        const needTotalList = initTotalList(records);
        this.setState({
          needTotalList,
          pagination:page,
          list:records
        });
      }
    });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  handleSearch = e => {

    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        // updatedTime: fieldsValue.updatedTime && fieldsValue.updatedTime.valueOf(),
      };
      this.setState({
        formValues: values,
      });

      const {filtersArg, sorter} = this.state;
      const filters = this.conversionFilter(filtersArg);
      const userId = getUserId();
      const range = "all";
      const payload = {
        userId,
        range,
        data: {
          info: {
            pageNo: 1,
            pageSize: 10,
            ...filters,
            ...values,
            ...sorter,
          }
        }
      };
      dispatch({
        type: 'wsdlModel/fetchWsdlList',
        payload,
        callback: resp => {
          console.log("callback",resp)
          const {data} = resp;
          const { page,records } = data;
          const needTotalList = initTotalList(records);
          this.setState({
            needTotalList,
            pagination:page,
            list:records
          });
        }
      });

    });
  };

  handleTableChange = (paginations, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    this.setState({pagination: paginations, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);

    const userId = getUserId();
    const range = "all";
    const payload = {
      userId,
      range,
      data: {
        info: {
          pageNo: paginations.current,
          pageSize: paginations.pageSize,
          ...formValues,
          ...filters,
          ...sorter,
        }
      }
    };
    console.log("sorter",sorter);
    if (sorter.field) {
      payload.data.info.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        console.log("callback",resp)
        const {data} = resp;
        const { page,records } = data;
        const needTotalList = initTotalList(records);
        this.setState({
          needTotalList,
          pagination:page,
          list:records
        });
      }
    });

  };

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: flag,
      selectedRow: row,
      fileList:[]
    });
  };


  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
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

  handleFile = (fileList)=>{


    const newFileList = fileList.filter(item=> item.old !== 1);
    this.setState({fileList:newFileList})
    console.log("handleFile",newFileList);
  }

  handleAdd = (fields, addForm) => {

    console.log('handleAdd:',fields);

    const { selectedRow,columnSchemas } = this.state;
    const { key } = columnSchemas;
    const userId = getUserId();
    const keyValue = selectedRow ? selectedRow[key] : "";

    // 上传数据
    const { fileList } = this.state;
    console.log("handleAdd",fileList);
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });
    Object.keys(fields).forEach( keyField => {
      formData.append(keyField, fields[keyField]);
    });
    formData.append('userId',userId);
    formData.append(key,keyValue);

    const token = localStorage.getItem("token");
    const tokenStr =  `${TOKEN_PREFIX}${token}`;
    console.log("tokenStr",tokenStr);
    // You can use any AJAX library you like
    reqwest({
      url: `${PREFIX_PATH}/baseInfo/wsdl/upload`,
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization :  `${TOKEN_PREFIX}${token}`
      },
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: []
        });
        message.success('upload successfully.');
      },
      error: () => {
        message.error('upload failed.');
      },
    });
  };

  handleStatusClick = (act, record) => {
    const { dispatch } = this.props;

    const payload = {};
    payload.data = {};
    payload.data.info = {};
    payload.option = parseInt(act, 10);
    payload.data.info.wsdlId = record.wsdlId;
    console.log('-----:', payload, act);
    dispatch({
      type: 'wsdlModel/saveWsdl',
      payload,
      callback: resp => {
        this.respDeal(resp);
      },
    });
  };


  handleParse = ( record ) =>{

    const { dispatch } = this.props;

    const payload = {};
    payload.data = {};
    payload.data.info = {};
    payload.data.info.wsdlId = record.wsdlId;
    dispatch({
      type: 'wsdlModel/parseWsdl',
      payload,
      callback: resp => {
        this.respDeal(resp);
      },
    });

  }

  handleApi = ( record ) =>{

    const { dispatch } = this.props;
    const {wsdlId,apiService,apiServiceBackends} = record;

    const payload = {};
    const wsdl = {wsdlId};
    payload.data = {};
    payload.data.info = {wsdl,apiService,apiServiceBackends};
    dispatch({
      type: 'wsdlModel/saveBatchApi',
      payload,
      callback: resp => {
        this.respDeal(resp);
      },
    });

  }

  respDeal = resp => {
    const { code } = resp;
    let { msg } = resp;
    if (code === '200') {
      if (!msg || msg === '') {
        msg = 'Success.';
      }
      message.success(msg);
      this.setState({
        selectedRows: [],
      });
      const { pagination, filtersArg, sorter } = this.state;
      this.handleTableChange(pagination, filtersArg, sorter);
    } else {
      message.error(`error:${msg}`);
    }
  };

  handleDetail = (record) => {
    this.handleDrawerVisible(record, true);
  }

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }

  cancelHandle = () => {
    this.setState({
      modalVisible: false,
      selectedRow: null,
    });
  };

  okHandle = () => {

  };

  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="wsdlName">
              {getFieldDecorator('wsdlName')(<Input placeholder="Please input wsdlName" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="wsdlUrl">
              {getFieldDecorator('wsdlUrl')(<Input placeholder="Please input wsdlUrl" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset} htmlType="button">
                重置
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <Button style={{marginBottom:16}} icon="plus" type="primary" onClick={() => this.handleModalVisible(null, true)}>
              New
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  renderMoreBtn = props => {
    const {current} = props;
    const {status,apiService} = current;
    return (
      <Dropdown
        overlay={
          <Menu onClick={({key}) => this.moreHandle(key, current)}>
            {status === STATUS.A ? <Menu.Item key="handleOffline">Offline</Menu.Item> : null}
            {status === STATUS.S ? <Menu.Item key="handleActivate">Activate</Menu.Item> : null}
            { !apiService        ? <Menu.Item key="handleParse">Parse</Menu.Item> : null}
            {status === STATUS.S ? <Menu.Item key="handleApi">Set Api</Menu.Item> : null}
            {status !== STATUS.D ? <Menu.Item key="handleDelete">Delete</Menu.Item> : null}
          </Menu>
        }
      >
        <a>
           More <Icon type="down" />
        </a>
      </Dropdown>
    );
  };

  moreHandle = (key, record) => {
    if (key === 'handleOffline') {
      this.handleStatusClick(ACT.ONLINE, record);
    } else if (key === 'handleDelete') {
      this.handleStatusClick(ACT.DEL, record);
    } else if (key === 'handleActivate') {
      this.handleStatusClick(ACT.ONLINE, record);
    } else if (key === 'handleParse'){
      // 先解析
      this.handleParse(record);
    } else if (key === 'handleApi'){
      // 批量设置Api
      this.handleApi(record);
    }
  };

  render() {

    const {
      loading
    } = this.props;
    const { pagination, selectedRow,selectedRowKeys,needTotalList,list,modalVisible,fileList,columnSchemas,selectedRows} = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: 'wsdlName',
        dataIndex: 'wsdlName',
      },
      {
        title: 'wsdlPath',
        dataIndex: 'wsdlPath',
      },
      {
        title: 'wsdlUrl',
        dataIndex: 'wsdlUrl',
        render(val) {
          return <Ellipsis length={20} tooltip>{val}</Ellipsis>;
        },
      },
      {
        title: 'wsdlFileName',
        dataIndex: 'wsdlFileName',
      },
      {
        title: 'createTime',
        dataIndex: 'createTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'updateTime',
        dataIndex: 'updateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={()=>this.handleModalVisible(record, true)}>Modify</a>
            <Divider type="vertical" />
            {this.renderMoreBtn({current:record})}
          </span>
        ),
      }
    ];


    const rowKey = "wsdlId";
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleFile: this.handleFile,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableAlert} style={selectedRowKeys.length===0?{display:'none'}:{}}>
              <Alert
                message={
                  <Fragment>
                    已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                    {needTotalList.map(item => (
                      <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                        总计&nbsp;
                        <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                    ))}
                    <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                      清空
                    </a>
                  </Fragment>
                }
                type="info"
                showIcon
              />
            </div>

            <Table
              rowKey={rowKey || 'key'}
              loading={loading}
              selectedRows={selectedRows}
              size="small"
              columns={columns}
              dataSource={list}
              pagination={paginationProps}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
            />

            <CreateForm
              {...parentMethods}
              modalVisible={modalVisible}
              selectedRow={selectedRow}
              columnSchemas={columnSchemas}
            />

          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WsdlList;
