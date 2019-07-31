import React, {PureComponent} from 'react';
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
  Spin,
  DatePicker
} from 'antd';
import debounce from 'lodash/debounce';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ApiList.less';
import {getItems} from '@/utils/masterData';
import {getUserId, getUserName} from "../../utils/authority";
import {getTimeDistance} from '@/utils/utils';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({wsdlModel, loading}) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
@Form.create()
class WsdlList extends PureComponent {

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchApi = debounce(this.fetchApi, 800);
  }


  state = {
    selectedRow: {},
    formValues: {},
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    filtersArg: {},
    sorter: {},
    drawerVisible: false,
    logList: [],
    data: [],
    value: [],
    fetching: false,
    targetOrgs:[]
  };

  componentWillMount() {
    const {dispatch} = this.props;
    /* 获取apiDebug数据 */
    const userId = getUserId();
    const range = "all";
    const params = {
      userId,
      range,
      info:{
        pageNo: 1,
        pageSize: 10
      }
    };
    console.log('binddata', params);
    dispatch({
      type: 'wsdlModel/wsdlList',
      payload: params,
      onConversionData: undefined,
      callback: resp => {

        const {data}= resp;
        const {records}= data;
        const targetOrgs = records.map(
          (item)=>(item.id)
        );
        console.log("targetOrgs",targetOrgs);
        this.setState({targetOrgs});
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


  onExpand = (expanded, record) => {
    console.log("onExpand1111", record);
    const {dispatch} = this.props;
    const {orderId, orderCode} = record;
    const {logList} = this.state;
    const newData = logList.map(item => ({...item}));

    const target = this.getRowByKey(orderId, newData);
    // console.log("onExpand",target);
    if (target && expanded) {

      if (target.expanded) {
        console.log("");
      } else {
        const payload = {};
        payload.orderCode = orderCode;
        dispatch({
          type: 'apiLogModel/logItemList',
          payload,
          callback: resp => {
            // console.log("onExpand",resp);
            const {data} = resp;
            const {intfOrderItems} = data;
            target.logItemList = intfOrderItems;
            target.expanded = true;
            this.setState({logList: newData});
          }
        });
      }

    }

  }

  expandedRowRender = (exRecord) => {

    console.log("expandedRowRender", exRecord);
    const {logItemList} = exRecord;
    const columns = [
      {
        title: 'orderItemCode',
        dataIndex: 'orderItemCode',
        render: (text, record) =>
          <a onClick={() => this.handleDetail(record)}>{text}</a>,
      },
      {
        title: 'reqTime',
        dataIndex: 'reqTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'respTime',
        dataIndex: 'respTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];

    return (<Table columns={columns} size="small" dataSource={logItemList} pagination={false}/>);

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

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    const {targetOrgs} = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    const userName = getUserName();
    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      userName,
      targetOrgs
    };
    dispatch({
      type: 'apiLogModel/logList',
      payload,
      callback: resp => {
        const {data} = resp;
        const {records, pagination} = data;
        this.setState({
          logList: records,
          pagination
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

  fetchApi = (value) => {
    this.lastFetchId += 1;
    this.setState({data: [], fetching: true});
    const {dispatch} = this.props;
    const userId = getUserId();
    const payload = {userId};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      name: value
    };
    dispatch({
      type: 'apiLogModel/apiListBySearch',
      payload,
      callback: resp => {
        if (resp.code === '200') {
          const {data} = resp;
          const {records} = data;
          const newData = records.map(api => ({
            text: `${api.name}`,
            value: api.apiId,
          }));
          this.setState({data: newData, fetching: false});
        }
      }
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {dispatch, form} = this.props;
    const {targetOrgs} = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // updatedTime: fieldsValue.updatedTime && fieldsValue.updatedTime.valueOf(),
      };
      console.log(fieldsValue, values);
      this.setState({
        formValues: values,
      });

      const {requestTime, extFlag,extInput} = values;
      switch (extFlag) {
        case "1":
          values.extReq1 = extInput;
          break;
        case "2":
          values.extReq2 = extInput;
          break;
        case "3":
          values.extReq3 = extInput;
          break;
        case "4":
          values.extRsp1 = extInput;
          break;
        case "5":
          values.extRsp2 = extInput;
          break;
        case "6":
          values.extRsp3 = extInput;
          break;
        default:
          break;
      }
      const requestStartTime = requestTime[0].format('YYYY-MM-DD HH:mm:ss');
      const requestEndTime = requestTime[1].format('YYYY-MM-DD HH:mm:ss');
      const {filtersArg, sorter} = this.state;
      const filters = this.conversionFilter(filtersArg);
      const userName = getUserName();
      const payload = {};
      payload.data = {};
      payload.data.info = {
        pageNo: 1,
        pageSize: 10,
        ...filters,
        ...values,
        ...sorter,
        requestStartTime,
        requestEndTime,
        userName,
        targetOrgs
      };
      dispatch({
        type: 'apiLogModel/logList',
        payload,
        callback: resp => {
          const {data} = resp;
          const {records, pagination} = data;
          this.setState({
            logList: records,
            pagination
          });
        }
      });
    });
  };

  handleTableChange = (paginations, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues,targetOrgs} = this.state;

    this.setState({pagination: paginations, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);
    const params = {
      pageNo: paginations.current,
      pageSize: paginations.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    const userName = getUserName();
    const payload = {};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      ...params,
      userName,
      targetOrgs
    };
    payload.data.info.pageNo = payload.data.info.pageNo ? payload.data.info.pageNo : 1;
    dispatch({
      type: 'apiLogModel/logList',
      payload,
      callback: resp => {
        const {data} = resp;
        const {records, pagination} = data;
        this.setState({
          logList: records,
          pagination
        });
      }
    });
  };

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  handleDetail = (record) => {
    this.handleDrawerVisible(record, true);
  }

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }

  handleRangePickerChange = rangePickerValue => {

    const {form} = this.props;

    form.setFieldsValue({
      requestTime:rangePickerValue
    });
    this.setState({
      rangePickerValue
    });
  };

  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {fetching, data, value, rangePickerValue} = this.state;
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
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {

    const {
      loading,
      wsdlModel: { data }
    } = this.props;
    console.log("this.props",this.props);
    const { pagination, selectedRow} = this.state;
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
        title: 'wsdlUrl',
        dataIndex: 'wsdlUrl',
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
    ];

    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              size="small"
              columns={columns}
              dataSource={data}
              pagination={paginationProps}
              onChange={this.handleTableChange}
              defaultExpandAllRows={false}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WsdlList;
