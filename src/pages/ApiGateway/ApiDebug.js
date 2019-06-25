import React, {PureComponent} from 'react';
import {Card, Button, Form, Input, Tabs, BackTop, message, Row, Col, Icon, Popover, Select, Modal} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {extend as requestExtend} from 'umi-request';
import ApiDocTableForm from './ApiDocTableForm';
import styles from './style.less';
import {getPayloadForApiDebug, getPayloadForReq} from './ApiCreate/util';
import {getItemValue} from '@/utils/masterData';
import {getUserId} from '@/utils/authority';

const {Option} = Select;

const {TabPane} = Tabs;
const {TextArea} = Input;

const requestHeaderFlag = 'requestHeader';
const requestBodyFlag = 'requestBody';
const responseHeaderFlag = 'responseHeader';
const responseBodyFlag = 'responseBody';

const fieldLabels = {
  requestBodySample: 'request Body Sample',
  responseBodySample: 'response Body Sample',
};
const request = requestExtend({
  // credentials: 'include', // 默认请求是否带上cookie
});

// let formChange = 0;// 全局变化值

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp
}))
@Form.create({})
// @Form.create({
//   onValuesChange({ dispatch }, changedValues, allValues) {
//
//     formChange +=1;
//     // 表单项变化时请求数据
//     // eslint-disable-next-line
//     console.log("onValuesChange",changedValues, allValues, formChange);
//     // 发送改变将值返回给父组件
//   },
// })
class ApiDebug extends PureComponent {
  state = {
    width: '100%',
    responseCode: {
      status: null,
      statusText: null,
      respTime: 0,
      respSize: 0
    }
  };

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, {passive: true});
    const {onRef} = this.props;
    onRef(this);
  }

  componentWillReceiveProps(nextProps) {

    const {selectedRow, form, apiService} = this.props;
    console.log("componentWillReceiveProps", nextProps.selectedRow);
    if (nextProps.selectedRow && selectedRow !== nextProps.selectedRow) {

      console.log("change111111");

      const apiServiceDoc = nextProps.selectedRow;
      // 从db里面获取字符串数据，再转成json对象，在增加key字段，赋值给表格组件
      const requestHeaderSample = this.convertDocObj(apiServiceDoc, requestHeaderFlag);
      const {requestBodySample, responseBodySample, userDebugId, debugName, urlSample, responseHeaderSample} = apiServiceDoc;
      // const responseHeaderSample = this.convertDocObj(apiServiceDoc, responseHeaderFlag);
      // const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
      // const urlSample = apiServiceDoc.urlSample ? apiServiceDoc.urlSample : `${urlSamplePre}${apiServiceDoc.urlSample}`;
      form.setFieldsValue({
        userDebugId,
        debugName,
        urlSample,
        requestHeaderSample,
        requestBodySample,
        responseHeaderSample,
        responseBodySample,
      });
    }
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getOption = (list, keyName, titleName) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item[keyName]} value={item[keyName]}>
        {item[titleName]}
      </Option>
    ));
  };

  getOrgOption() {
    const {apiService} = this.props;
    const {apiServiceOrgs} = apiService || {apiServiceOrgs: null};
    console.log("getOrgOption", this.props);
    return this.getOption(apiServiceOrgs, 'id', 'appkey');
  }

  convertDocObj = (apiServiceDoc, flag) => {
    try {
      if (apiServiceDoc) {
        const spec = apiServiceDoc[`${flag}Sample`];
        if (spec && spec.trim() !== '') {
          const specArr = (JSON.parse(spec) || []).map((item) => ({
            ...item,
            // key: `${requestHeaderFlag}-${index}`,
          }));
          return specArr;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  getToken = (key, value) => {

    const {
      dispatch, form
    } = this.props;
    const payload = {};
    payload.appkey = value.props.children;
    dispatch({
      type: 'uniComp/token',
      payload,
      callback: resp => {
        console.log('resp=======', resp);
        /* 设置请求Header */
        const {data} = resp;
        if (resp.code === '200') {
          /* appkey */
          const appkey = value.props.children;
          /* token  */
          const tokenKey = getItemValue('serviceAgent', 'req_header', 'tokenKey');
          const tokenPre = getItemValue('serviceAgent', 'req_header', 'tokenPre');
          const token = `${tokenPre}${data.token}`;
          const requestHeaderSample = form.getFieldValue('requestHeaderSample');
          // const {requestHeaderSample} = this.state;

          const newRequestHeaderSample = [];
          requestHeaderSample.forEach((item) => {

            if (item.name !== 'appkey') {
              if (item.name === tokenKey) {
                // eslint-disable-next-line no-param-reassign
                item.remark = token;
                newRequestHeaderSample.push(item);
              } else {
                newRequestHeaderSample.push(item);
              }
            } else {
              // eslint-disable-next-line no-param-reassign
              item.remark = appkey;
              newRequestHeaderSample.push(item);
            }
          });
          const appKeyAttr = newRequestHeaderSample.filter(item => item.name === 'appkey');
          const tokenAttr = newRequestHeaderSample.filter(item => item.name === tokenKey);
          if (!appKeyAttr || appKeyAttr.length === 0) {
            newRequestHeaderSample.push({
              name: 'appkey',
              remark: appkey
            });
          }
          if (!tokenAttr || tokenAttr.length === 0) {
            newRequestHeaderSample.push({
              name: tokenKey,
              remark: token
            });
          }

          form.setFieldsValue({
            requestHeaderSample: newRequestHeaderSample
          });
        }

      },
    });
  }

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const {width: stateWidth} = this.state;
        if (stateWidth !== width) {
          this.setState({width});
        }
      }
    });
  };

  getErrorInfo = () => {
    const {
      form: {getFieldsError},
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  strToSize = (str) =>{

    let len = 0 ;
    for(let i=0;i < str.length;){
      const ch = str.charAt(i);
      if(ch.codePointAt(0) > 0xFFFF){
        len += 4;
      }else{
        len += 2 ;
      }
      i += 1;
    }
    const size = (len/1024).toFixed(2);
    return size;
  }

  send = () => {

    const {
      form,
      apiService
    } = this.props;
    const values = form.getFieldsValue();

    form.validateFields(['urlSample'], {}, (error, value) => {
      if (error) {
        console.log("form", error, value);
      } else {

        const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
        const apiInfo = getPayloadForReq(urlSamplePre, values);
        // console.log("send----",apiInfo);
        const reqMethod = apiService && apiService.reqMethod ? apiService.reqMethod : 'get';
        const beforeTime = new Date().getMilliseconds();
        request(apiInfo.urlSample,
          {method: reqMethod, data: apiInfo.requestBodySample, getResponse: true, headers: apiInfo.requestHeaderSample})
          .then(({data, response}) => {

            console.log("success", data, response);
            const afterTime = new Date().getMilliseconds();

            const responseBodyStr =  JSON.stringify(data).substr(0,5000);
            const responseStr =  JSON.stringify(data) + JSON.stringify(response);
            const respSize =  this.strToSize(responseStr);
            if (response.status === 200) {
              form.setFieldsValue({
                responseBodySample: responseBodyStr,
                responseHeaderSample: JSON.stringify(response.headers)
              });
            }
            const respTime = Math.abs(afterTime - beforeTime);
            const responseCode = {};
            responseCode.status = response.status;
            responseCode.statusText = response.statusText;
            responseCode.respTime = respTime;
            responseCode.respSize = respSize;
            this.setState({responseCode});

            if (response.status === 200) {
              message.success('Send Success');
            } else {
              message.error('Send Fail');
            }

          }).catch(err => {
            console.log("err:", err);
            const afterTime = new Date().getMilliseconds();
            const respTime = Math.abs(afterTime - beforeTime);
            let status = '500';
            let statusText = err;
            const responseCode = {};
            if (err.response) {
              // eslint-disable-next-line prefer-destructuring
              status = err.response.status;
              // eslint-disable-next-line prefer-destructuring
              statusText = err.response.statusText;
            }
            const responseStr =  JSON.stringify(err.response);
            const respSize =  this.strToSize(responseStr);
            responseCode.status = status;
            responseCode.statusText = statusText;
            responseCode.respTime = respTime;
            responseCode.respSize = respSize;
            this.setState({responseCode});
            message.error('Send Fail');
        });
      }
    });
    // const checkStatus = (response) => {
    //   console.log("checkStatus",response);
    //   const codeMessage = {
    //     200: '服务器成功返回请求的数据。',
    //     201: '新建或修改数据成功。',
    //     202: '一个请求已经进入后台排队（异步任务）。',
    //     204: '删除数据成功。',
    //     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    //     401: '用户没有权限（令牌、用户名、密码错误）。',
    //     403: '用户得到授权，但是访问是被禁止的。',
    //     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    //     406: '请求的格式不可得。',
    //     410: '请求的资源被永久删除，且不会再得到的。',
    //     422: '当创建一个对象时，发生一个验证错误。',
    //     500: '服务器发生错误，请检查服务器。',
    //     502: '网关错误。',
    //     503: '服务不可用，服务器暂时过载或维护。',
    //     504: '网关超时。',
    //   };
    //   if (response.status >= 200 && response.status < 300) {
    //     return response;
    //   }
    //   const errortext = codeMessage[response.status] || response.statusText;
    //   notification.error({
    //     message: `请求错误 ${response.status}: ${response.url}`,
    //     description: errortext,
    //   });
    //   const err = new Error(errortext);
    //   err.name = response.status;
    //   err.response = response;
    //   console.log("checkStatus",err);
    //   throw err;
    // };
  }

  save = () => {
    this.getErrorInfo();
    const {
      form: {validateFieldsAndScroll},
      apiService,
      dispatch,
    } = this.props;
    const userId = getUserId();
    apiService.userId = userId;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        // console.log("api update submit values:",values);
        const apiInfo = getPayloadForApiDebug(apiService, values);
        console.log("api doc update submit apiInfo:", apiInfo);
        // submit the values
        dispatch({
          type: 'uniComp/saveDebug',
          payload: apiInfo,
          callback: resp => {
            // console.log('resp=======', resp);
            if (resp.code === '200') {
              message.success('提交成功');
              if(apiInfo.option === 1){
                this.getDebugList('save','');
              }else{
                this.getDebugList('update',values.userDebugId);
              }
            } else {
              message.error('提交失败');
            }
          },
        });
      }
    });
  };

  getDebugList = (sign,id) => {

    const {apiId, dispatch, onApiDebug} = this.props;
    /* 获取apiDebug数据 */
    const userId = getUserId();
    const tableName = "api_user_debug";
    const pageSize = 9999;
    const params = {userId, tableName, pageSize, apiId};
    console.log('binddata', params);
    dispatch({
      type: 'uniComp/list',
      payload: params,
      onConversionData: undefined,
      callback: resp => {

        const {data} = resp;
        const {records} = data;
        const menuList = records.map(item => ({ ...item, userDebugId: `u${item.userDebugId}` }));
        const lastKey = (menuList && menuList.length > 0) ? menuList[menuList.length - 1].userDebugId : null;
        const lastRecord = (menuList && menuList.length > 0) ? menuList[menuList.length - 1]: null;
        let selectKey = 0;
        let selectedRow = {};
        let idNew = id;
        /* 删除  */
        if(sign === 'del' ){
          selectKey = id;
        }
        /* 更新 */
        if(sign === 'update' ){
          selectKey = id;
          // eslint-disable-next-line prefer-destructuring
          selectedRow = menuList.filter(item => id &&  item.userDebugId  === id )[0];
          idNew = '';
        }
        /* 保存 */
        if(sign === 'save' ){
          selectKey = lastKey;
          selectedRow = lastRecord;
          idNew = '';
        }
        console.log("---getDebugList----",sign,id,selectedRow);
        onApiDebug(menuList, selectKey,selectedRow,idNew);
      }
    });

  }

  deleteItem = (id) => {

    console.log("handleDel", id);
    const {dispatch} = this.props;
    const payload = {};
    payload.tableName = 'api_user_debug';
    payload.id = id.replace('u','');
    dispatch({
      type: 'uniComp/del',
      payload,
      callback: resp => {
        console.log('resp=======', resp);
        if (resp.code === '200') {
          message.success('删除成功');
          /* 重新获取列表信息  */
          this.getDebugList('del',id);
        }else{
          message.error('删除失败');
        }
      }
    });
  }

  handleDel = (id) => {

    Modal.confirm({
      title: 'Delete Api Debug',
      content: 'Are you sure delete this Api Debug？',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => this.deleteItem(id),
    });

  };

  render() {
    const {
      form,
      submitting,
      apiService,
      selectedRow
    } = this.props;
    const {getFieldDecorator} = form;
    console.log("render---this.props---", this.props);
    const {
      userDebugId,
      debugName,
      urlSample,
      requestBodySample,
      responseHeaderSample,
      responseBodySample,
    } = selectedRow;
    const {responseCode}= this.state;
    const requestHeaderSample = this.convertDocObj(selectedRow, requestHeaderFlag);
    // console.log("render---123---", this.state);
    const sampleText = 'sample for post:{"type":"xxx","name":"xxx"}';
    let delIcon = (
      <Button type="danger" shape="circle" icon="delete" onClick={() => this.handleDel(userDebugId)} />
    );
    if (selectedRow.isNew) {
      delIcon = "";
    }
    let tabResp = "";
    console.log("render", responseCode);
    if (responseCode.status !== null) {
      const contentStatus = (
        <div>
          <p>{responseCode.statusText}</p>
        </div>
      );
      tabResp =
        (
          <div>
            <Popover content={contentStatus} title={responseCode.status}>Status： {responseCode.status} </Popover>
            <span>Time：{responseCode.respTime}ms </span>
            <span>Size: {responseCode.respSize}KB</span>
          </div>
        );
    }
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <PageHeaderWrapper>
        <Card title="" className={styles.card} bordered={false}>
          <Row>
            <Col
              xl={{span: 8}}
              style={{height: 60}}
            >
              <Form.Item label="DebugName" {...formItemLayout}>
                {getFieldDecorator('debugName', {
                  initialValue: debugName,
                  rules: [
                    {
                      required: true,
                      message: 'debugName must be between 2 and 80 characters！',
                      min: 2,
                      max: 80,
                    },
                  ],
                })(<Input placeholder="Please input request debugName" />)}
              </Form.Item>
            </Col>
            <Col xl={{span: 10}} style={{textAlign: 'right'}}>
              {delIcon}
            </Col>
          </Row>
          <Row>
            <Col
              xl={{span: 4}}
              lg={{span: 3}}
              md={{span: 6}}
              sm={24}
              style={{height: 50}}
            >
              <Form.Item>
                {getFieldDecorator('orgId')(
                  <Select placeholder="请选择" style={{width: '100%'}} onChange={this.getToken}>
                    {this.getOrgOption()}
                  </Select>
                )}
                {getFieldDecorator('userDebugId', {
                  initialValue: userDebugId
                })(<Input hidden />)}
              </Form.Item>
            </Col>
            <Col
              xl={{span: 3}}
              lg={{span: 3}}
              md={{span: 6}}
              sm={24}
              style={{height: 50}}
            >
              <Form.Item>
                {getFieldDecorator('reqMethod', {
                  initialValue: apiService && apiService.reqMethod ? apiService.reqMethod : null,
                  rules: [],
                })(<Input placeholder="request Method" disabled />)}
              </Form.Item>
            </Col>
            <Col lg={9} md={6} sm={24} style={{height: 50}}>
              <Form.Item>
                {getFieldDecorator('urlSample', {
                  initialValue: urlSample,
                  rules: [
                    {
                      required: true,
                      message: 'urlSample must be between 2 and 500 characters！',
                      min: 2,
                      max: 500,
                    },
                  ],
                })(<Input placeholder="request Url" />)}
              </Form.Item>
            </Col>
            <Col xl={{span: 6}} lg={9} md={6} sm={24} style={{height: 40}}>
              <Form.Item>
                <Button type="primary" onClick={this.send}>
                  Send
                </Button>
                <span>&nbsp;&nbsp;</span>

                <Button type="danger" onClick={this.save} loading={submitting}>
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Tabs defaultActiveKey="1" tabBarExtraContent={tabResp}>
              <TabPane tab="Request Header" key="1">
                <Card title="" className={styles.card} bordered={false}>
                  {getFieldDecorator('requestHeaderSample', {
                    initialValue: requestHeaderSample,
                  })(<ApiDocTableForm hideParent hideType nameTitle='Key' remarkTitle='value' />)}
                </Card>
              </TabPane>
              <TabPane tab="Request Body" key="2">
                <Form.Item>
                  {getFieldDecorator(`${requestBodyFlag}Sample`, {
                    initialValue: (requestBodySample),
                    rules: [{required: false, message: '不能超过5000字符！', max: 5000}],
                  })(<TextArea placeholder={sampleText} autosize={{minRows: 4, maxRows: 15}} />)}
                </Form.Item>
              </TabPane>
            </Tabs>
          </Row>
          <Row>
            <Tabs defaultActiveKey="3">
              <TabPane tab="Response Header" key="3">
                {getFieldDecorator(`${responseHeaderFlag}Sample`, {
                  initialValue: responseHeaderSample,
                  rules: [{required: false, message: '不能超过5000字符！', max: 5000}],
                })(<TextArea placeholder={sampleText} autosize={{minRows: 4, maxRows: 15}} />)}
              </TabPane>
              <TabPane tab="Response Body" key="4">
                <Form.Item>
                  {getFieldDecorator(`${responseBodyFlag}Sample`, {
                    initialValue: responseBodySample,
                    rules: [],
                  })(
                    <TextArea
                      rows={4}
                      placeholder={sampleText}
                      autosize={{minRows: 4, maxRows: 15}}
                    />
                  )}
                </Form.Item>
              </TabPane>
            </Tabs>
          </Row>
        </Card>

        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default ApiDebug;
