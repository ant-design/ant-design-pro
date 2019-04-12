import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  Input,
  Popover,
  Radio,
  Tabs,
} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';
import SelectView from './SelectView';
import GroupSelectView from './GroupSelectView';
import {getPayloadForUpdate,conversionAttr,getApiFlowData} from "./ApiCreate/util";
import RadioView from "./RadioView";
import OrgSelectView from "./OrgSelectView";
import ApiFlow from "../Editor/GGEditor/ApiFlow"
// import apiFlowData from '../Editor/GGEditor/mock/apiFlow.json';

const {TabPane} = Tabs;
const forms=['front','back','backAttr'];

const fieldLabels = {
  front:{
    groupId: '分组',
    name: '名称',
    serviceType: '服务类型',
    requestUrl: '请求地址',
    protocol: '协议',
    reqMethod: '请求Method',
    apiType: 'Api范围',
  },
  back:{
    serviceType: '服务类型',
    url: '落地方地址',
    protocol: '协议',
    reqMethod: '请求Method',
    connectTimeout: '连接超时时间（秒）',
    socketTimeout: '处理超时时间（秒）',
    orgId: '服务提供者',
    authType: '安全认证',
  },
  backAttr:{
    userName: 'user Name',
    userPassword: 'user Password',
    tokenStr: 'token Str',
    tokenUser: 'token User',
    tokenPassword: 'token Password',
    tokenUrl: 'token Url',
    trustStore: 'trustStore path',
    trustStorePassword: 'trustStore Password',
    keyStore: 'keyStore path',
    keyStorePassword: 'keyStore Password',
    ssl:'SSL证书校验',
  },
};

// const tableData = [
//   {
//     backEndId: '1',
//     serviceSeq: '1',
//     backendType: 'in',
//     url: 'com.ai.odc.changeParam',
//   },
//   {
//     backEndId: '2',
//     serviceSeq: '2',
//     backendType: 'in',
//     url: 'http://odc.ai.com/changeParam',
//   },
//   {
//     backEndId: '3',
//     serviceSeq: '4',
//     backendType: 'out',
//     url: 'com.ai.odc.changeParam',
//   },
// ];

@connect(({ apiCreateModel, loading }) => ({
  apiService:apiCreateModel.apiService,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiUpdate extends PureComponent {
  state = {
    width: '100%',
    apiFlowData:{},
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });

    const { location } = this.props;
    const {state}=location;
    // console.log("location state:",state);
    const {apiId}=state || {apiId:105};
    this.getApi(apiId);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getApi = (apiId)=>{

    const { dispatch } = this.props;
    if (apiId!==-1){
      const payload = {};
      payload.data = {};
      payload.data.info = {};
      payload.data.info.apiId = apiId;
      dispatch({
        type: 'apiCreateModel/apiInfo',
        payload,
        callback: (resp) => {
          this.setBaseInfo(resp,dispatch);
        },
      });
    }
    else{
      // dispatch({
      //   type: 'apiCreateModel/initForAdd',
      // });
      // this.setBaseInfo({data:{}},dispatch);
      router.push('/exception/403');
    }
  }

  setBaseInfo = (resp) => {
    const {  form } = this.props;
    const { data } = resp;
    const apiServiceBackend = data.apiServiceBackends.find((obj)=>obj.backendType==="endpoint");
    const {apiServiceBackendAttrs}=apiServiceBackend;
    const conversionAttrObj=conversionAttr(apiServiceBackendAttrs);
    const apiServiceBackendMembers  = data.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");

    // console.log("====:",conversionAttrObj);
    // // console.log('setBaseInfo data:', data,form.getFieldValue("front"));
    Object.keys(form.getFieldsValue()).forEach(key => {
      // // console.log('key:', key);
      if(key!=='members'){
          if(key==='front' || key==='back' || key==='backAttr') {
            const innerObj = {};
            Object.keys(form.getFieldValue(key)).forEach(innerKey => {
              if(key==='front'){
                innerObj[innerKey] = data[innerKey] || null;
              }
              else if(key==='backAttr'){
                innerObj[innerKey] = conversionAttrObj[innerKey] || null;
              }
              else{
                innerObj[innerKey] = apiServiceBackend[innerKey] || null;
              }
              // // console.log('innerKey:', innerKey, );
            });
            const obj = {};
            obj[key]=innerObj;
            // console.log("init Data in ApiUpdate2:",obj);
            form.setFieldsValue(obj);
          }
      }
      else{
        const obj = {};
        obj[key] = apiServiceBackendMembers || [];
        // // console.log(form.getFieldValue("members"));
        // form.setFieldsValue(obj);
      }
    });
  };

  getErrorInfo = () => {
    const errorList=[];
    forms.forEach((value)=>{
      const subErrorList=this.getErrorInfoByPrefixList(value)||[];
      errorList.push(...subErrorList);
    })
    const errorInfo=this.getErrorInfoByPrefix(errorList);
    return errorInfo;
  }

  getErrorInfoByPrefixList = (prefix) => {
    const {
      form: { getFieldError },
    } = this.props;
    // const errors = getFieldsError();
    const errors = getFieldError(prefix);
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    // // console.log(errors,errorCount);
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const realFieldKey=`${prefix}.${fieldKey}`;
      const labelNode = document.querySelector(`label[for="${realFieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    // // console.log(errors);
    const errorList = Object.keys(errors).map(key => {
      // // console.log(errors[key],fieldLabels.front[key]);
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels.front[key]}</div>
        </li>
      );
    })||[];
    return errorList.filter(item=>item!==null);
  };

  getErrorInfoByPrefix = (errorList) => {
    // console.log(errorList);
    const errorCount=errorList?errorList.length:0;
    if(errorCount===0){
      return null;
    }
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

  validate = () => {
    const {
      form: { validateFieldsAndScroll },apiService,
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        // console.log("api update submit values:",values);
        const apiInfo = getPayloadForUpdate(apiService,values);
        // console.log("api update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitStepForm',
          payload: apiInfo,
          callback:(resp)=>{
            // this.getApi(resp.data.apiId);
            this.setBaseInfo(resp,dispatch);
          }
        });

      }
    });
  };

  changeTab=(key)=> {
    console.log(key);
    if(key==='flow'){
      const { form } = this.props;
      const values=form.getFieldsValue();
      const apiFlowData=getApiFlowData(values);
      this.setState({apiFlowData});
      console.log("====:",apiFlowData);
    }
  }

  render() {
    const {
      form: { getFieldDecorator,getFieldValue },
      submitting,apiService
    } = this.props;
    const { width,apiFlowData } = this.state;

    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");
    const apiServiceBackendMembers  = apiService&&apiService.apiServiceBackends?apiService.apiServiceBackends.map((item)=>({...item,key:item.serviceSeq})):[];
    // // console.log("apiServiceBackendMembers:",apiServiceBackendMembers);
    return (
      <PageHeaderWrapper>
        <Card title="定义请求信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={2}>
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.groupId}>
                  {getFieldDecorator('front.groupId', {
                    rules: [{ required: true, message: '请选择分组' }],
                  })(<GroupSelectView />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.name}>
                  {getFieldDecorator('front.name', {
                    rules: [{ required: true, message: 'Please input api name' }],
                  })(<Input placeholder="Please input api name" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.requestUrl}>
                  {getFieldDecorator('front.requestUrl', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={2}>
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.serviceType}>
                  {getFieldDecorator('front.serviceType', {
                    rules: [{ required: true, message: '请选择serviceType' }],
                  })(<SelectView javaCode="apiService" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.reqMethod}>
                  {getFieldDecorator('front.reqMethod', {
                    rules: [{ required: true, message: '请选择HTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_method" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.front.protocol}>
                  {getFieldDecorator('front.protocol', {
                    rules: [{ required: true, message: '请选择协议' }],
                  })(<SelectView javaCode="apiService" javaKey="protocol" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={2}>
              <Col lg={6} md={12} sm={24} style={{height:50}}>
                <Form.Item label={fieldLabels.front.apiType}>
                  {getFieldDecorator('front.apiType', {
                    initialValue: apiService.apiType,
                    rules: [{ required: true, message: '请选择服务类型' }],
                  })(<RadioView javaCode="apiService" javaKey="api_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <span />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <span />
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="落地方服务信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.serviceType}>
                  {getFieldDecorator('back.serviceType', {
                    rules: [{ required: true, message: '请选择后端服务类型' }],
                  })(<SelectView javaCode="apiService" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.url}>
                  {getFieldDecorator('back.url', {
                    rules: [{ required: true, message: '请输入后端请求地址' }],
                  })(<Input placeholder="请输入后端请求地址" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.protocol}>
                  {getFieldDecorator('back.protocol', {
                    rules: [{ required: true, message: '请选择后端协议' }],
                  })(<SelectView javaCode="apiService" javaKey="protocol" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.reqMethod}>
                  {getFieldDecorator('back.reqMethod', {
                    rules: [{ required: true, message: '请选择HTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_method" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.connectTimeout}>
                  {getFieldDecorator('back.connectTimeout', {
                    rules: [{ required: true, message: '后端服务连接超时' }],
                  })(<Input placeholder="请输入后端服务连接超时（ms）" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.socketTimeout}>
                  {getFieldDecorator('back.socketTimeout', {
                    rules: [{ required: true, message: '后端服务请求超时' }],
                  })(<Input placeholder="请输入后端服务请求超时（ms）" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.orgId}>
                  {getFieldDecorator('back.orgId', {
                    rules: [{ required: true, message: `请选择${fieldLabels.back.orgId}` }],
                  })(<OrgSelectView orgType="0,2" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 16, offset: 2 }} lg={{ span: 18 }} md={{ span: 24 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.back.authType}>
                  {getFieldDecorator('backAttr.authType', {
                    rules: [{ required: true, message: `请选择${fieldLabels.backAttr.authType}` }],
                  })(
                    <Radio.Group>
                      <Radio value="noneAuth">无认证</Radio>
                      <Radio value="basicAuth">Basic认证</Radio>
                      <Radio value="fixedToken">固定Token认证</Radio>
                      <Radio value="dyncToken">动态Token认证</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background:'#fff7e6',
                display: getFieldValue('backAttr.authType') === 'basicAuth' ? 'block' : 'none',
              }}
            >
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.userName}>
                  {getFieldDecorator('backAttr.userName', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'basicAuth', message: `请选择${fieldLabels.backAttr.userName}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 16, offset: 2 }} lg={{ span: 18 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.userPassword}>
                  {getFieldDecorator('backAttr.userPassword', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'basicAuth', message: `请选择${fieldLabels.backAttr.userPassword}` }],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background:'#fff7e6',
                display: getFieldValue('backAttr.authType') === 'fixedToken' ? 'block' : 'none',
              }}
            >
              <Col lg={24} md={24} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.tokenStr}>
                  {getFieldDecorator('backAttr.tokenStr', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'fixedToken', message: `请选择${fieldLabels.backAttr.tokenStr}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background:'#fff7e6',
                display: getFieldValue('backAttr.authType') === 'dyncToken' ? 'block' : 'none',
              }}
            >
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.tokenUser}>
                  {getFieldDecorator('backAttr.tokenUser', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'dyncToken', message: `请选择${fieldLabels.backAttr.tokenUser}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.tokenPassword}>
                  {getFieldDecorator('backAttr.tokenPassword', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'dyncToken', message: `请选择${fieldLabels.backAttr.tokenPassword}` }],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.tokenUrl}>
                  {getFieldDecorator('backAttr.tokenUrl', {
                    rules: [{ required: getFieldValue('backAttr.authType') === 'dyncToken', message: `请选择${fieldLabels.backAttr.tokenUrl}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
            >
              <Col lg={6} md={12} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.ssl}>
                  {getFieldDecorator('backAttr.ssl', {
                    rules: [{ required: true, message: `请选择${fieldLabels.backAttr.ssl}` }],
                  })(
                    <Radio.Group>
                      <Radio value="open">开</Radio>
                      <Radio value="close">关</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background:'#fff7e6',
                display: getFieldValue('backAttr.ssl') === 'open' ? 'block' : 'none',
              }}
            >
              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.keyStore}>
                  {getFieldDecorator('backAttr.keyStore', {
                    rules: [{ required: getFieldValue('backAttr.ssl') === 'open', message: `请选择${fieldLabels.backAttr.keyStore}` }],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={24} style={{height:80}}>
                <Form.Item label={fieldLabels.backAttr.keyStorePassword}>
                  {getFieldDecorator('backAttr.keyStorePassword', {
                    rules: [{ required: getFieldValue('backAttr.ssl') === 'open', message: `请选择${fieldLabels.backAttr.keyStorePassword}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background:'#fff7e6',
                display: getFieldValue('backAttr.ssl') === 'open' ? 'block' : 'none',
              }}
            >
              <Col xl={{ span: 12}} lg={{ span: 12 }} md={{ span: 12 }} sm={24} style={{height:80}}>

                <Form.Item label={fieldLabels.backAttr.trustStore}>
                  {getFieldDecorator('backAttr.trustStore', {
                    rules: [{ required: getFieldValue('backAttr.ssl') === 'open', message: `请选择${fieldLabels.backAttr.trustStore}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={24} style={{height:80}}>

                <Form.Item label={fieldLabels.backAttr.trustStorePassword}>
                  {getFieldDecorator('backAttr.trustStorePassword', {
                    rules: [{ required: getFieldValue('backAttr.ssl') === 'open', message: `请选择${fieldLabels.backAttr.trustStorePassword}` }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="Table" key="table">
            <Card title="高级配置" bordered={false}>
              {getFieldDecorator('members', {
                initialValue: apiServiceBackendMembers,
              })(<TableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Api Flow" key="flow">
            <Card title="高级配置" bordered={false}>
              <ApiFlow data={apiFlowData} />
            </Card>
          </TabPane>
        </Tabs>,
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
