import React, {PureComponent} from 'react';
import {Card, Button, Form, Input, Tabs, BackTop, message, Row, Col, Icon, Popover, Select} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {extend as requestExtend} from 'umi-request';
import ApiDocTableForm from './ApiDocTableForm';
import styles from './style.less';
import {getPayloadForApiDebug,getPayloadForReq} from './ApiCreate/util';
import {getPlaceHolder, getQueryArr, isJson, toApiSpecJson, toType} from '../util';
import {getItemValue} from '@/utils/masterData';
import {getUserId} from '@/utils/authority';


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

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp
}))
@Form.create()
class ApiDebug extends PureComponent {
  state = {
    width: '100%',
    userDebugId: null,
    debugName: null,
    urlSample: null,
    requestHeaderSample: [],
    requestBodySample: null,
    responseHeaderSample: [],
    responseBodySample: null,
  };

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, {passive: true});

    const {apiId, apiService} = this.props;

  }

  componentWillReceiveProps(nextProps) {

    const {selectedRow} = this.props;
    console.log("componentWillReceiveProps", nextProps.selectedRow);
    if (nextProps.selectedRow && selectedRow !== nextProps.selectedRow) {

      const apiServiceDoc = nextProps.selectedRow;
      // 从db里面获取字符串数据，再转成json对象，在增加key字段，赋值给表格组件
      const requestHeaderSample = this.convertDocObj(apiServiceDoc, requestHeaderFlag);
      const {requestBodySample,responseBodySample,userDebugId, debugName} = apiServiceDoc;
      const responseHeaderSample = this.convertDocObj(apiServiceDoc, responseHeaderFlag);
      const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
      const urlSample = apiServiceDoc.urlSample ? apiServiceDoc.urlSample : `${urlSamplePre}${apiServiceDoc.urlSample}`;
      this.setState({
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

  /**
   * 处理占位符和get参数的说明文档
   * @param urlSpec
   * @param manualFlag
   * @returns {Array}
   */
  handleUrlGenerate = (urlSpec, manualFlag) => {
    const {apiService} = this.props;
    const {requestUrl} = apiService;
    let url = requestUrl;
    if (manualFlag) {
      const {form} = this.props;
      const fieldsValue = form.getFieldsValue();
      const {urlSample} = fieldsValue;
      url = urlSample;
    }
    let retAttr = [];
    if (url && url.trim() !== '' && url.indexOf('{') > -1) {
      const flatJsonArray = getPlaceHolder(url);
      retAttr = flatJsonArray.map(spec => {
        const findObj = urlSpec.find(
          item => item.name === spec.name && item.parent === spec.parent
        );
        return findObj ? {...spec, remark: findObj.remark} : spec;
      });
    }
    if (url && url.trim() !== '' && url.indexOf('?') > -1) {
      const flatJsonArray = getQueryArr(url);
      const mergeArr = flatJsonArray.map(spec => {
        const findObj = retAttr.find(
          item => item.name === spec.name && item.parent === spec.parent
        );
        return findObj ? {...spec, remark: findObj.remark} : spec;
      });
      retAttr = retAttr.concat(mergeArr);
    }

    retAttr = retAttr.map((item, index) => ({...item, key: `url-${index}`}));
    if (manualFlag) {
      this.setState({urlSpec: retAttr});
    }
    return retAttr;
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
    console.log(key, value);
    const {
      dispatch,
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
          const {requestHeaderSample} = this.state;
          const newRequestHeaderSample = requestHeaderSample.filter(item => item.name !== 'appkey' && item.name !== tokenKey);
          newRequestHeaderSample.push({
            name: 'appkey',
            remark: appkey
          });
          newRequestHeaderSample.push({
            name: tokenKey,
            remark: token
          });
          this.setState({
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
      form: {validateFieldsAndScroll},
      apiService
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const urlSamplePre = getItemValue('env', 'localhost', 'angentHost');
        const apiInfo = getPayloadForReq(urlSamplePre, values);
        // console.log("send----",apiInfo);
        try{
          const reqMethod = apiService && apiService.reqMethod ? apiService.reqMethod : 'get';
          request( apiInfo.urlSample,
            {method: reqMethod, data:apiInfo.requestBodySample,getResponse: true, headers: apiInfo.requestHeaderSample })
            .then(({data, response}) => {
              if (data.code === '200') {
                message.success('Send Success');
                this.setState({
                  responseBodySample:response.body,
                  responseHeaderSample:response.headers
                })
              }else{
                message.success('Send Fail');
              }
              console.log("req----",data, response, response.headers);
            });
        }catch (e){
          message.success('Send Fail');
        }

        // console.log("api doc update submit apiInfo:", apiInfo);
        // // submit the values
        // dispatch({
        //   type: 'uniComp/req',
        //   payload: apiInfo,
        //   callback: resp => {
        //     console.log('resp=======', resp);
        //     if (resp.code === '200') {
        //       message.success('提交成功');
        //     } else {
        //       message.error('提交失败');
        //     }
        //   },
        // });
      }
    });
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
            } else {
              message.error('提交失败');
            }
          },
        });
      }
    });
  };

  handleDel = (id) => {
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
      },
    });
  };

  render() {
    const {
      form: {getFieldDecorator},
      submitting,
      apiService,
      apiId,
      selectedRow
    } = this.props;
    console.log("render---this.props---", this.props, apiId);
    const {
      userDebugId,
      debugName,
      urlSample,
      requestHeaderSample,
      requestBodySample,
      responseHeaderSample,
      responseBodySample,
    } = this.state;
    // console.log("render---123---", this.state);
    const sampleText = 'sample for post:{"type":"xxx","name":"xxx"}';
    let delIcon = (
      <Icon type="delete" onClick={() => this.handleDel(userDebugId)} />
    );
    if (!userDebugId || selectedRow.isNew ) {
      delIcon = "";
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
        </Card>
        <Tabs defaultActiveKey="1">
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
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('responseHeaderSample', {
                initialValue: responseHeaderSample,
              })(<ApiDocTableForm hideParent hideType nameTitle='Key' remarkTitle='value' />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Body" key="4">
            <Card title="Response Parameter Body Sample" className={styles.card} bordered={false}>
              <Form.Item>
                {getFieldDecorator(`${responseBodyFlag}Sample`, {
                  initialValue: (responseBodySample),
                  rules: [{required: false, message: '不能超过5000字符！', max: 5000}],
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
