import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';
import RadioView from '../RadioView';
import WsdlSelectView from "../WsdlSelectView";
import { getUserId } from '@/utils/authority';
import constants from '@/utils/constUtil';

const {WS,REST,HTTP} = constants;
const userId = getUserId(); // 获取当前登录用户编号

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ apiCreateModel }) => ({
  data: apiCreateModel.apiService,
}))
@Form.create()
class Step2 extends React.PureComponent {

  setUrl = wsdlObj =>{
    console.log(wsdlObj);
    const { form } = this.props;
    const {wsdlUrlPath}=wsdlObj;
    const requestUrl=wsdlUrlPath.replace("/ws/","");
    console.log(requestUrl);
    const obj = {requestUrl};
    form.setFieldsValue(obj);
    // dispatch({
    //   type: 'apiCreateModel/saveStepFormData',
    //   payload: {requestUrl},
    //   stepType:1,
    // });

  }

  handleChange = e => {
    const { dispatch } = this.props;
    const {value}=e.target;
    console.log("value:",value);
    const payload= {
      serviceType:value
    };
    if(value==='2'){
      dispatch({
        type: 'apiCreateModel/saveStepFormData',
        payload: {
          ...payload,
          reqMethod:'post',
          pathPrefix:WS.PATH_PREFIX,
        },
        stepType:1,
      });
    }
    else if(value==='1'){
      dispatch({
        type: 'apiCreateModel/saveStepFormData',
        payload: {
          ...payload,
          pathPrefix:REST.PATH_PREFIX,
        },
        stepType:1,
      });
    }
    else if(value==='3'){
      dispatch({
        type: 'apiCreateModel/saveStepFormData',
        payload: {
          ...payload,
          pathPrefix:HTTP.PATH_PREFIX,
        },
        stepType:1,
      });
    }
  };

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields,getFieldValue } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/info');
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          console.log("values:",values);
          dispatch({
            type: 'apiCreateModel/saveStepFormData',
            payload: {...values},
            stepType:1,
          });
          router.push('/apiGateway/apiCreate/producer');
        }
      });
    };
    const display=data.serviceType!==WS.SERVICE_TYPE?{display:'none'}:null;
    const displayForRest=data.serviceType===WS.SERVICE_TYPE?{display:'none'}:null;
    const rulesForWs=data.serviceType===WS.SERVICE_TYPE?[{ required: true, message: 'please input' }]:[];

    console.log(display,data.serviceType,data);
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Api名称：">
            {data.name}
          </Form.Item>
          <Divider style={{ margin: '24px 0' }} />
          <span>
            <Form.Item {...formItemLayout} label="服务类型">
              {getFieldDecorator('serviceType', {
                initialValue: data.serviceType,
                rules: [{ required: true, message: '请选择服务类型' }],
              })(<RadioView javaCode="apiService" javaKey="service_type" onChange={this.handleChange} />)}
            </Form.Item>
          </span>
          <Form.Item {...formItemLayout} label="WSDL" style={display}>
            {getFieldDecorator('wsdlId', {
              initialValue: data.wsdlId,
              rules: [{ required: getFieldValue('serviceType') === '2', message: 'please select' }],
            })(<WsdlSelectView userId={userId} onSetUrl={this.setUrl} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求PATH">
            {getFieldDecorator('requestUrl', {
              initialValue: data.requestUrl,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input addonBefore={data.pathPrefix} placeholder="请输入请求PATH" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求类型" style={displayForRest}>
            {getFieldDecorator('reqMethod', {
              initialValue: data.reqMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_method" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Action Name" style={display}>
            {getFieldDecorator('actionName', {
              initialValue: data.actionName,
              rules: rulesForWs,
            })(<Input placeholder="请选择Action Name" />)}
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }} htmlType="button">
              上一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>路径</h4>
          <p>
            这个步骤主要是设置对外暴露的路径,外部系统调用的时候需要路径加配合授权的app key进行调用。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step2;
