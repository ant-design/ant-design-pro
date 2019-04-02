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
} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';
import SelectView from './SelectView';
import GroupSelectView from './GroupSelectView';
import {getPayloadForUpdate} from "./ApiCreate/util";


const fieldLabels = {
  front:{
    groupId: 'Group',
    name: 'Api Name',
    serviceType: 'serviceType',
    requestUrl: 'requestUrl',
    protocol: 'protocol',
    reqMethod: 'reqMethod',
  },
  back:{
    serviceType: 'serviceType',
    url: 'requestUrl',
    protocol: 'protocol',
    reqMethod: 'reqMethod',
    connectTimeout: 'connectTimeout',
    socketTimeout: 'socketTimeout',
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
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });

    const { dispatch,location } = this.props;
    const {state}=location;
    // console.log("location state:",state);
    const {apiId}=state || {apiId:90};
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


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  setBaseInfo = (resp) => {
    const {  form } = this.props;
    const { data } = resp;
    const apiServiceBackend = data.apiServiceBackends.find((obj)=>obj.backendType==="endpoint");
    const apiServiceBackendMembers  = data.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");

    // console.log(apiServiceBackend);
    // console.log('setBaseInfo data:', data,form.getFieldValue("front"));
    Object.keys(form.getFieldsValue()).forEach(key => {
      // console.log('key:', key);
      if(key!=='members'){
          if(key==='front' || key==='back') {
            const innerObj = {};
            Object.keys(form.getFieldValue(key)).forEach(innerKey => {
              if(key==='front'){
                innerObj[innerKey] = data[innerKey] || null;
              }
              else{
                innerObj[innerKey] = apiServiceBackend[innerKey] || null;
              }
              // console.log('innerKey:', innerKey, );
            });
            // console.log(innerObj);
            const obj = {};
            obj[key]=innerObj;
            form.setFieldsValue(obj);
          }
      }
      else{
        const obj = {};
        obj[key] = apiServiceBackendMembers || [];
        // console.log(form.getFieldValue("members"));
        // form.setFieldsValue(obj);
      }
    });
  };

  getErrorInfo = () => {
    const errorInfo=this.getErrorInfoByPrefix("front");
    if (!errorInfo){
      return this.getErrorInfoByPrefix("back");
    }
    return errorInfo;
  }

  getErrorInfoByPrefix = (prefix) => {
    const {
      form: { getFieldError },
    } = this.props;
    // const errors = getFieldsError();
    const errors = getFieldError(prefix);

    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    // console.log(errors,errorCount);
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
    // console.log(errors);
    const errorList = Object.keys(errors).map(key => {
      console.log(errors[key],fieldLabels.front[key]);
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
      console.log("error in ui======:",error);
      if (!error) {
        console.log("api update submit values:",values);
        const apiInfo = getPayloadForUpdate(apiService,values);
        console.log("api update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitStepForm',
          payload: apiInfo,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,apiService
    } = this.props;
    const { width } = this.state;

    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");
    const apiServiceBackendMembers  = apiService.apiServiceBackends.map((item)=>({...item,key:item.serviceSeq}));
    // console.log("apiServiceBackendMembers:",apiServiceBackendMembers);
    return (
      <PageHeaderWrapper>
        <Card title="定义请求信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.front.groupId}>
                  {getFieldDecorator('front.groupId', {
                    rules: [{ required: true, message: '请选择分组' }],
                  })(<GroupSelectView />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.front.name}>
                  {getFieldDecorator('front.name', {
                    rules: [{ required: true, message: 'Please input api name' }],
                  })(<Input placeholder="Please input api name" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.front.requestUrl}>
                  {getFieldDecorator('front.requestUrl', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.front.serviceType}>
                  {getFieldDecorator('front.serviceType', {
                    rules: [{ required: true, message: '请选择serviceType' }],
                  })(<SelectView javaCode="apiService" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.front.reqMethod}>
                  {getFieldDecorator('front.reqMethod', {
                    rules: [{ required: true, message: '请选择HTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_mothod" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.front.protocol}>
                  {getFieldDecorator('front.protocol', {
                    rules: [{ required: true, message: '请选择协议' }],
                  })(<SelectView javaCode="apiService" javaKey="protocol" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="落地方服务信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.back.serviceType}>
                  {getFieldDecorator('back.serviceType', {
                    rules: [{ required: true, message: '请选择后端服务类型' }],
                  })(<SelectView javaCode="apiService" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.back.url}>
                  {getFieldDecorator('back.url', {
                    rules: [{ required: true, message: '请输入后端请求地址' }],
                  })(<Input placeholder="请输入后端请求地址" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.back.protocol}>
                  {getFieldDecorator('back.protocol', {
                    rules: [{ required: true, message: '请选择后端协议' }],
                  })(<SelectView javaCode="apiService" javaKey="protocol" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.back.reqMethod}>
                  {getFieldDecorator('back.reqMethod', {
                    rules: [{ required: true, message: '请选择HTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_mothod" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.back.connectTimeout}>
                  {getFieldDecorator('back.connectTimeout', {
                    rules: [{ required: true, message: '后端服务连接超时' }],
                  })(<Input placeholder="请输入后端服务连接超时（ms）" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.back.socketTimeout}>
                  {getFieldDecorator('back.socketTimeout', {
                    rules: [{ required: true, message: '后端服务请求超时' }],
                  })(<Input placeholder="请输入后端服务请求超时（ms）" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="高级配置" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: apiServiceBackendMembers,
          })(<TableForm />)}
        </Card>
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
