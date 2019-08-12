import React, {PureComponent} from 'react';
import { Button, Row, Col, Form, Input, Table, Card, Select} from 'antd';

import {connect} from 'dva';

import styles from './ApiList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';
import {getUserId} from "../../utils/authority";
import ApiTransfer from "./ApiTransfer";

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({wsdlModel, loading}) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
@Form.create()
class WsdlAuth extends PureComponent {

  state = {
    wsdlId:null,
    pagination: {},
    apiServices: [],
    records: [],
    selectedRow:{},
    modalVisible:false,
    filtersArg: {},
  };

  componentDidMount() {

    const {location} = this.props;
    const {state} = location;
    console.log("location state:", state);
    const {wsdlId} = state || {wsdlId: 105};
    this.getWsdl(wsdlId);

  }

  getWsdl = wsdlId => {
    const {dispatch} = this.props;
    this.setState({wsdlId});
    const payload = {};
    payload.data = {};
    payload.data.info = {
      wsdlId,
      pageNo: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'wsdlModel/authDetail',
      payload,
      callback: resp => {
        const {data} = resp;
        const { apiServices, authOrgs} = data;
        const { records,pagination} = authOrgs;
        this.setState({
          pagination,
          apiServices,
          records
        });
      }
    });
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

  getOption(javaCode, javaKey) {
    const item = getItems(javaCode, javaKey);
    return this.getOptionWhithList(item);
  }

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

      const {filtersArg, sorter,wsdlId} = this.state;
      const filters = this.conversionFilter(filtersArg);

      const payload = {
        data: {
          info: {
            wsdlId,
            pageNo: 1,
            pageSize: 10,
            ...filters,
            ...values,
            ...sorter,
          }
        }
      };
      dispatch({
        type: 'wsdlModel/authDetail',
        payload,
        callback: resp => {
          const {data} = resp;
          const { apiServices, authOrgs} = data;
          const { records,pagination} = authOrgs;
          this.setState({
            pagination,
            apiServices,
            records
          });
        }
      });

    });
  };


  handleFormReset = () => {
    const {form} = this.props;
    const {wsdlId} = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.getWsdl(wsdlId);
  };

  handleTableChange = (paginations, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues,wsdlId} = this.state;

    this.setState({pagination: paginations, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);

    const userId = getUserId();
    const payload = {
      userId,
      data: {
        info: {
          wsdlId,
          pageNo: paginations.current,
          pageSize: paginations.pageSize,
          ...formValues,
          ...filters,
          ...sorter,
        }
      }
    };
    if (sorter.field) {
      payload.data.info.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'wsdlModel/authDetail',
      payload,
      callback: resp => {
        const {data} = resp;
        const { apiServices, authOrgs} = data;
        const { records,pagination} = authOrgs;
        this.setState({
          pagination,
          apiServices,
          records
        });
      }
    });

  };

  handleVisible = (record,modalVisible) =>{
    this.setState({
      modalVisible,
      selectedRow:record
    });
  }

  handleRefreshData = () =>{
    const {wsdlId} = this.state;
    this.getWsdl(wsdlId);
  }

  handleAccess = ( record ) =>{
    this.handleVisible(record,true);
  }

  renderForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="orgName">
              {getFieldDecorator('orgName')(<Input placeholder="Please input orgName" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="status">
              {getFieldDecorator('wsdlAuthType', {})(
                <Select placeholder="请选择" style={{width: '100%'}}>
                  {this.getOption("wsdl", "wsdlAuthType")}
                </Select>
              )}
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

  render() {

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'orgName',
        dataIndex: 'orgName',
      },
      {
        title: 'appkey',
        dataIndex: 'appkey',
      },
      {
        title: 'authRatio',
        dataIndex: 'authRatio',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.handleAccess(record, true)}>Access</a>
          </span>
        ),
      }
    ];
    const { pagination, apiServices, records, selectedRow, modalVisible, wsdlId} = this.state;
    const {loading} = this.props;
    const rowSelection = {};
    const rowKey = '';

    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{height: '50px'}}
        title="Wsdl Auth"
      >
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            rowKey={rowKey || 'key'}
            loading={loading}
            size="small"
            columns={columns}
            dataSource={records}
            pagination={pagination}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
          />
          <ApiTransfer
            title="Access Api"
            modalVisible={modalVisible}
            onVisible={this.handleVisible}
            selectedRow={selectedRow}
            onRefreshData={this.handleRefreshData}
            keyName="apiId"
            apiServices={apiServices}
            relationName="apiServices" // 选中的关联表
            wsdlId={wsdlId}
          />
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default WsdlAuth;
