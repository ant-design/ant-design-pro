import React, {PureComponent} from 'react';
import {Card, Button, Form, Input, Tabs, BackTop, message, Row, Col, Icon, Popover, Select, Modal} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {extend as requestExtend} from 'umi-request';
import ApiDocTableForm from './ApiDocTableForm';
import styles from './style.less';
import {getPayloadForApiDebug,getPayloadForReq} from './ApiCreate/util';
import { isJson, toApiSpecJson, toType} from '../util';
import {getItemValue} from '@/utils/masterData';
import {getUserId} from '@/utils/authority';

const { Option } = Select;

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
    userDebugId: null,
    debugName: null,
    urlSample: null,
    requestHeaderSample: [],
    requestBodySample: null,
    responseHeaderSample: null,
    responseBodySample: null,
    responseCode:{
      status:null,
      statusText:null
    },
    visible: false
  };

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, {passive: true});
    const {onRef} = this.props;
    onRef(this);
  }

  componentWillReceiveProps(nextProps) {

    const { selectedRow, form, apiService} = this.props;
    console.log("componentWillReceiveProps", nextProps.selectedRow);
    if (nextProps.selectedRow && selectedRow !== nextProps.selectedRow) {

      const apiServiceDoc = nextProps.selectedRow;
      // 从db里面获取字符串数据，再转成json对象，在增加key字段，赋值给表格组件
      const requestHeaderSample = this.convertDocObj(apiServiceDoc, requestHeaderFlag);
      const {requestBodySample,responseBodySample,userDebugId, debugName,urlSample,responseHeaderSample} = apiServiceDoc;
      // const responseHeaderSample = this.convertDocObj(apiServiceDoc, responseHeaderFlag);
      // const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
      // const urlSample = apiServiceDoc.urlSample ? apiServiceDoc.urlSample : `${urlSamplePre}${apiServiceDoc.urlSample}`;
      const urlSampleNew = urlSample !== null && urlSample !== "" ? urlSample : apiService?apiService.requestUrl:"";
      form.setFieldsValue({
        userDebugId,
        debugName,
        urlSample:urlSampleNew,
        requestHeaderSample,
        requestBodySample,
        responseHeaderSample,
        responseBodySample,
      });
      //
      // this.setState({
      //   userDebugId,
      //   debugName,
      //   urlSample,
      //   requestHeaderSample,
      //   requestBodySample,
      //   responseHeaderSample,
      //   responseBodySample,
      // });

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


  /**
   * 处理header和body的说明文档
   * @param typeParam
   * @param oldSpec
   */
  handleBodyGenerate = (typeParam, oldSpec) => {
    const {form} = this.props;
    const fieldsValue = form.getFieldsValue();
    let newValue = '';
    switch (typeParam) {
      case requestHeaderFlag:
        newValue = '[{"appkey":"xxxx"}]';
        break;
      case requestBodyFlag:
        newValue = fieldsValue[`${requestBodyFlag}Sample`];
        break;
      case responseBodyFlag:
        newValue = fieldsValue[`${responseBodyFlag}Sample`];
        break;
      default:
        break;
    }
    console.log('handleBodyGenerate', newValue);
    if (newValue) {
      const isJsonResult = isJson(newValue);
      console.log("isJsonResult", isJsonResult);
      if (isJsonResult.result) {
        const newValueJson = JSON.parse(newValue);
        const parentValue = typeParam === requestHeaderFlag ? '-' : 'root';
        const flatJsonArray =
          typeParam === requestHeaderFlag
            ? []
            : [{name: 'root', type: toType(newValueJson), remark: 'root element', parent: '-'}];
        const requestBodySampleJsonOne =
          toType(newValueJson) === 'array' ? newValueJson[0] : newValueJson;
        toApiSpecJson(requestBodySampleJsonOne, flatJsonArray, parentValue);
        const mergeArr = flatJsonArray.map(spec => {
          const findObj = oldSpec.find(
            item => item.name === spec.name && item.parent === spec.parent
          );
          return findObj ? {...spec, remark: findObj.remark} : spec;
        });
        const specArr = mergeArr.map((item, index) => ({...item, key: `${typeParam}-${index}`}));
        this.setState({[`${typeParam}Spec`]: specArr});
      } else {
        message.error(isJsonResult.msg);
      }
    }
  };

  getToken = (key, value) => {

    const {
      dispatch,form
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

          const newRequestHeaderSample=[];
          requestHeaderSample.forEach((item) => {

            if (item.name !== 'appkey') {
              if (item.name === tokenKey) {
                item.remark = token;
                newRequestHeaderSample.push(item);
              } else {
                newRequestHeaderSample.push(item);
              }
            } else {
              item.remark = appkey;
              newRequestHeaderSample.push(item);
            }
          });
          const appKeyAttr = newRequestHeaderSample.filter(item => item.name === 'appkey' );
          const tokenAttr = newRequestHeaderSample.filter(item => item.name === tokenKey );
          if(!appKeyAttr||appKeyAttr.length === 0){
            newRequestHeaderSample.push({
              name: 'appkey',
              remark: appkey
            });
          }
          if(!tokenAttr||tokenAttr.length === 0){
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
          <Icon type="cross-circle-o" className={styles.errorIcon} />
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

  send = () => {

    const {
      form,
      apiService
    } = this.props;
    const {validateFields} = form;
    const values = form.getFieldsValue();

    form.validateFields(['urlSample'], {}, (error, value) => {
      if (error) {
          console.log("form",error,value);
      } else {

        const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
        const apiInfo = getPayloadForReq(urlSamplePre, values);
        // console.log("send----",apiInfo);
        const reqMethod = apiService && apiService.reqMethod ? apiService.reqMethod : 'get';

        request( apiInfo.urlSample,
          {method: reqMethod, data:apiInfo.requestBodySample,getResponse: true, headers: apiInfo.requestHeaderSample})
          .then(({data,response}) => {

            console.log("success",data,response);


            if (response.status === 200 ) {
              message.success('Send Success');

              form.setFieldsValue({
                responseBodySample:JSON.stringify(data),
                responseHeaderSample:JSON.stringify(response.headers)
              });

            }else{
              message.success('Send Fail');
            }

            this.setState({
              responseCode : response
            });

          }).catch(err => {

            console.log("err:",err);
            if (err.response){
              this.setState({responseCode : err.response});
            }
            else {
              const {responseCode} = this.state;
              responseCode.status = '500';
              responseCode.statusText = err;
              this.setState({responseCode});
            }
            // if (err.data){
            //   this.setState({responseBody:err.data});
            // }
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
              this.getDebugList('save');
            } else {
              message.error('提交失败');
            }
          },
        });
      }
    });
  };

  getDebugList = (sign) =>{
    console.log("-----getDebugList");
    const {apiId, dispatch,onApiDebug} = this.props;
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
        console.log("---123---", resp);
        const {data} = resp;
        const {records} = data;
        const key = records ? records[0].userDebugId.toString() : null;
        console.log("----22222---", key);
        const selectKey = sign=== 'del'? key: -1;
        onApiDebug(records,selectKey);
      }
    });

  }

  deleteItem = (id) => {

    console.log("handleDel", id);
    const {dispatch} = this.props;
    const payload = {};
    payload.tableName = 'api_user_debug';
    payload.id = id;
    dispatch({
      type: 'uniComp/del',
      payload,
      callback: resp => {
        console.log('resp=======', resp);
        message.success('删除成功');
        /* 重新获取列表信息  */
        this.getDebugList('del');
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
    // console.log("render---this.props---", this.props, apiId);
    const {
      userDebugId,
      debugName,
      urlSample,
      requestHeaderSample,
      requestBodySample,
      responseHeaderSample,
      responseBodySample,
      responseCode
    } = this.state;
    console.log("render---123---", this.state);
    const sampleText = 'sample for post:{"type":"xxx","name":"xxx"}';
    const userDeubgIdNew = (userDebugId !== null && userDebugId !== "") ? userDebugId : form.getFieldValue('userDebugId');
    let delIcon = (
      <Icon type="delete" onClick={() => this.handleDel(userDeubgIdNew)} />
    );
    if (!userDeubgIdNew || selectedRow.isNew ) {
      delIcon = "";
    }
    let tabResp = "";
    if( responseCode.status !== null ){
      const contentStatus = (
        <div>
          <p>{responseCode.statusText}</p>
        </div>
      );
      tabResp =
        (
          <div>
            <Popover content={contentStatus} title={responseCode.status}>Status： {responseCode.status} </Popover>
            <Popover content="prompt text">Time： </Popover>
            <Popover content="prompt text">Size: </Popover>
          </div>
        );
    }

    return (
      <PageHeaderWrapper>
        <Card title="" className={styles.card} bordered={false} extra={delIcon}>
          <Row gutter={2}>
            <Col
              xl={{span: 6}}
              lg={{span: 8}}
              md={{span: 12}}
              sm={24}
              style={{height: 80}}
            >
              <Form.Item label="Debug Name">
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
                })(<Input placeholder="request debugName" />)}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={2}>
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
                  initialValue: urlSample !== null && urlSample !== "" ? urlSample : apiService?apiService.requestUrl:"",
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
        </Card>
        <Tabs defaultActiveKey="1" tabBarExtraContent={tabResp}>
          <TabPane tab="Request Header" key="1">
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('requestHeaderSample', {
                initialValue: requestHeaderSample,
              })(<ApiDocTableForm hideParent hideType nameTitle='Key' remarkTitle='value' />)}
            </Card>
          </TabPane>
          <TabPane tab="Request Body" key="2">
            <Card title="Request Parameter Body Sample" className={styles.card} bordered={false}>
              <Form.Item>
                {getFieldDecorator(`${requestBodyFlag}Sample`, {
                  initialValue: (requestBodySample),
                  rules: [{required: false, message: '不能超过5000字符！', max: 5000}],
                })(<TextArea placeholder={sampleText} autosize={{minRows: 4, maxRows: 15}} />)}
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="3">
          <TabPane tab="Response Header" key="3">
            <Card title="Response Parameter Header Sample" className={styles.card} bordered={false}>
              {getFieldDecorator(`${responseHeaderFlag}Sample`, {
                initialValue: responseHeaderSample,
                rules: [{required: false, message: '不能超过5000字符！', max: 5000}],
              })(<TextArea placeholder={sampleText} autosize={{minRows: 4, maxRows: 15}} />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Body" key="4">
            <Card title="Response Parameter Body Sample" className={styles.card} bordered={false}>
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
            </Card>
          </TabPane>
        </Tabs>

        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default ApiDebug;
