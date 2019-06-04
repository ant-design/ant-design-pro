import React, { PureComponent } from 'react';
import { Card, Button, Form, Input, Tabs, BackTop, message, Row, Col, Icon, Popover } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ApiDocTableForm from './ApiDocTableForm';
import styles from './style.less';
import { getPayloadForApiDoc } from './ApiCreate/util';
import { getPlaceHolder, getQueryArr, isJson, toApiSpecJson, toType } from '../util';

// import RoleTransfer from "../UserManager/Privilege";
// import apiFlowData from '../Editor/GGEditor/mock/apiFlow.json';

const { TabPane } = Tabs;
const { TextArea } = Input;

const requestHeaderFlag = 'requestHeader';
const requestBodyFlag = 'requestBody';
const responseBodyFlag = 'responseBody';
const responseHeaderFlag = 'responseHeader';
const stateCodeFlag = 'stateCode';
const busiCodeFlag = 'busiCode';

const fieldLabels = {
  requestBodySample: 'request Body Sample',
  responseBodySample: 'response Body Sample',
};

@connect(({ apiCreateModel, loading }) => ({
  apiService: apiCreateModel.apiService,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiUpdate extends PureComponent {
  state = {
    width: '100%',
    apiServiceDoc: {},
    urlSpec: [],
    requestHeaderSpec: [],
    requestBodySpec: [],
    responseHeaderSpec: [],
    responseBodySpec: [],
    stateCodeSpec: [],
    busiCodeSpec: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });

    const { location } = this.props;
    const { state } = location;
    // console.log("location state:",state);
    const { apiId } = state || { apiId: 105 };
    this.getApi(apiId);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getApi = apiId => {
    const { dispatch } = this.props;
    if (apiId !== -1) {
      const payload = {};
      payload.option = 4;
      payload.range = 1;
      payload.data = {};
      payload.data.info = {};
      payload.data.info.apiId = apiId;
      dispatch({
        type: 'apiCreateModel/apiInfo',
        payload,
        callback: resp => {
          this.setBaseInfo(resp, dispatch);
        },
      });
    } else {
      router.push('/exception/403');
    }
  };

  convertDocObj = (apiServiceDoc, flag) => {
    try {
      if (apiServiceDoc) {
        const spec = apiServiceDoc[`${flag}Spec`];
        console.log(flag, spec);
        if (spec && spec.trim() !== '') {
          const specArr = (JSON.parse(spec) || []).map((item, index) => ({
            ...item,
            key: `${requestHeaderFlag}-${index}`,
          }));
          console.log(flag, specArr);
          return specArr;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  setBaseInfo = resp => {
    const { data } = resp;
    const apiServiceDoc = data && data.apiServiceDoc ? data.apiServiceDoc : {};
    // 从db里面获取字符串数据，再转成json对象，在增加key字段，赋值给表格组件
    const requestHeaderSpec = this.convertDocObj(apiServiceDoc, requestHeaderFlag);
    const requestBodySpec = this.convertDocObj(apiServiceDoc, requestBodyFlag);
    const responseHeaderSpec = this.convertDocObj(apiServiceDoc, responseHeaderFlag);
    const responseBodySpec = this.convertDocObj(apiServiceDoc, responseBodyFlag);
    const stateCodeSpec = this.convertDocObj(apiServiceDoc, stateCodeFlag);
    const busiCodeSpec = this.convertDocObj(apiServiceDoc, busiCodeFlag);
    // －－－－－初始化url spec数据－－－－－
    const urlSpec = (JSON.parse(apiServiceDoc.urlSpec) || []).map((item, index) => ({
      ...item,
      key: `url-${index}`,
    }));
    console.log('urlSpec1:', urlSpec);
    const newUrlSpec = urlSpec.length === 0 ? this.handleUrlGenerate(urlSpec, false) : urlSpec;
    console.log('newUrlSpec:', newUrlSpec);
    // －－－－－初始化request header数据－－－－－
    this.handleBodyGenerate(requestHeaderFlag, requestHeaderSpec);

    this.setState({
      apiServiceDoc,
      urlSpec: newUrlSpec,
      requestBodySpec,
      responseHeaderSpec,
      responseBodySpec,
      stateCodeSpec,
      busiCodeSpec,
    });
  };

  /**
   * 处理占位符和get参数的说明文档
   * @param urlSpec
   * @param manualFlag
   * @returns {Array}
   */
  handleUrlGenerate = (urlSpec, manualFlag) => {
    const { apiService } = this.props;
    const { requestUrl } = apiService;
    let url = requestUrl;
    if (manualFlag) {
      const { form } = this.props;
      const fieldsValue = form.getFieldsValue();
      const { urlSample } = fieldsValue;
      url = urlSample;
    }
    let retAttr = [];
    if (url && url.trim() !== '' && url.indexOf('{') > -1) {
      const flatJsonArray = getPlaceHolder(url);
      retAttr = flatJsonArray.map(spec => {
        const findObj = urlSpec.find(
          item => item.name === spec.name && item.parent === spec.parent
        );
        return findObj ? { ...spec, remark: findObj.remark } : spec;
      });
    }
    if (url && url.trim() !== '' && url.indexOf('?') > -1) {
      const flatJsonArray = getQueryArr(url);
      const mergeArr = flatJsonArray.map(spec => {
        const findObj = retAttr.find(
          item => item.name === spec.name && item.parent === spec.parent
        );
        return findObj ? { ...spec, remark: findObj.remark } : spec;
      });
      retAttr = retAttr.concat(mergeArr);
    }

    retAttr = retAttr.map((item, index) => ({ ...item, key: `url-${index}` }));
    if (manualFlag) {
      this.setState({ urlSpec: retAttr });
    }
    return retAttr;
  };

  /**
   * 处理header和body的说明文档
   * @param typeParam
   * @param oldSpec
   */
  handleBodyGenerate = (typeParam, oldSpec) => {
    const { form } = this.props;
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
    if (newValue && newValue.trim() !== '') {
      const isJsonResult = isJson(newValue);
      if (isJsonResult.result) {
        const newValueJson = JSON.parse(newValue);
        const parentValue = typeParam === requestHeaderFlag ? '-' : 'root';
        const flatJsonArray =
          typeParam === requestHeaderFlag
            ? []
            : [{ name: 'root', type: toType(newValueJson), remark: 'root element', parent: '-' }];
        const requestBodySampleJsonOne =
          toType(newValueJson) === 'array' ? newValueJson[0] : newValueJson;
        toApiSpecJson(requestBodySampleJsonOne, flatJsonArray, parentValue);
        const mergeArr = flatJsonArray.map(spec => {
          const findObj = oldSpec.find(
            item => item.name === spec.name && item.parent === spec.parent
          );
          return findObj ? { ...spec, remark: findObj.remark } : spec;
        });
        const specArr = mergeArr.map((item, index) => ({ ...item, key: `${typeParam}-${index}` }));
        this.setState({ [`${typeParam}Spec`]: specArr });
      } else {
        message.error(isJsonResult.msg);
      }
    }
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
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

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      apiService,
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        // console.log("api update submit values:",values);
        const apiInfo = getPayloadForApiDoc(apiService, values);
        // console.log("api doc update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitApiDoc',
          payload: apiInfo,
          callback: resp => {
            // this.getApi(resp.data.apiId);
            this.setBaseInfo(resp, dispatch);
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      apiService,
    } = this.props;
    const {
      width,
      apiServiceDoc,
      urlSpec,
      requestBodySpec,
      requestHeaderSpec,
      responseHeaderSpec,
      responseBodySpec,
      stateCodeSpec,
      busiCodeSpec,
    } = this.state;
    console.log('urlSpec:', urlSpec);
    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");
    const sampleText = 'sample for post:{"type":"xxx","name":"xxx"}';
    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{ height: '50px' }}
        title="Compile Api Specification"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Url" key="1">
            <Card title="" className={styles.card} bordered={false}>
              <Row gutter={2}>
                <Col
                  xl={{ span: 6 }}
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={24}
                  style={{ height: 50 }}
                >
                  <Form.Item
                    label="Request Method"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('reqMethod', {
                      initialValue: apiService.reqMethod,
                      rules: [],
                    })(<Input placeholder="request Method" disabled />)}
                  </Form.Item>
                </Col>
                <Col lg={18} md={12} sm={24} style={{ height: 50 }}>
                  <Form.Item label="Request Path" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    {getFieldDecorator('urlSample', {
                      initialValue:
                        apiServiceDoc.urlSample && apiServiceDoc.urlSample.trim() !== ''
                          ? apiServiceDoc.urlSample
                          : apiService.requestUrl,
                      rules: [
                        {
                          required: false,
                          message: 'urlSample must be between 2 and 500 characters！',
                          min: 2,
                          max: 500,
                        },
                      ],
                    })(<Input placeholder="request Url" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Button
                style={{ width: '100%', marginTop: 8, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={() => this.handleUrlGenerate(urlSpec, true)}
              >
                Generate Specification By Url
              </Button>
              <Form.Item label="Url PlaceHolders Specification">
                {getFieldDecorator('urlSpec', {
                  initialValue: urlSpec,
                })(<ApiDocTableForm />)}
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Request Header" key="2">
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('requestHeaderSpec', {
                initialValue: requestHeaderSpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Request Body" key="3">
            <Card title="Request Parameter Body Sample" className={styles.card} bordered={false}>
              <Form.Item>
                {getFieldDecorator(`${requestBodyFlag}Sample`, {
                  initialValue: apiServiceDoc.requestBodySample,
                  rules: [{ required: false, message: '不能超过5000字符！', max: 5000 }],
                })(<TextArea placeholder={sampleText} autosize={{ minRows: 4, maxRows: 15 }} />)}
              </Form.Item>
              <Button
                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={() => this.handleBodyGenerate(requestBodyFlag, requestBodySpec)}
              >
                Generate Specification By Sample
              </Button>
            </Card>
            <Card
              title="Request Parameter Body Specification"
              className={styles.card}
              bordered={false}
            >
              {getFieldDecorator('requestBodySpec', {
                initialValue: requestBodySpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Header" key="4">
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('responseHeaderSpec', {
                initialValue: responseHeaderSpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Body" key="5">
            <Card title="Response Parameter Body Sample" className={styles.card} bordered={false}>
              <Form.Item>
                {getFieldDecorator(`${responseBodyFlag}Sample`, {
                  initialValue: apiServiceDoc.responseBodySample,
                  rules: [{ required: false, message: '不能超过5000字符！', max: 5000 }],
                })(
                  <TextArea
                    rows={4}
                    placeholder={sampleText}
                    autosize={{ minRows: 4, maxRows: 15 }}
                  />
                )}
              </Form.Item>
              <Button
                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={() => this.handleBodyGenerate(responseBodyFlag, responseBodySpec)}
              >
                Generate Specification By Sample
              </Button>
            </Card>
            <Card
              title="Response Parameter Body Specification"
              className={styles.card}
              bordered={false}
            >
              {getFieldDecorator('responseBodySpec', {
                initialValue: responseBodySpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Code" key="6">
            <Card title="State Code" className={styles.card} bordered={false}>
              {getFieldDecorator('stateCodeSpec', {
                initialValue: stateCodeSpec,
              })(<ApiDocTableForm />)}
            </Card>
            <Card title="Business Code" className={styles.card} bordered={false}>
              {getFieldDecorator('busiCodeSpec', {
                initialValue: busiCodeSpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
        </Tabs>

        <BackTop />
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApiUpdate;
