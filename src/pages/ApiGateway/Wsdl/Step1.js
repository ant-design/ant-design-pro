import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';
import RadioView from '../RadioView';
import WsdlSelectView from "../WsdlSelectView";
import GroupSelectView from '../GroupSelectView';
import {getUserId, getUserName} from "../../../utils/authority";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreateWsdlModel,loading }) => ({
  apiCreateWsdlModel,
  detailLoading: loading.effects['apiGatewayModel/apiInfo'],
}))
@Form.create()
class Step1 extends React.PureComponent {

  componentDidMount() {
    const { dispatch,apiCreateWsdlModel,location} = this.props;
    const  apiWsdlId = apiCreateWsdlModel.wsdlId;
    const {apiService} = apiCreateWsdlModel;
    const {state} = location;
    const {wsdlId,record,actionNames} = state || {wsdlId: null,record:{},actionNames:[]};
    const payload = {wsdlId,record,actionNames};
    // console.log("did",apiCreateWsdlModel, apiWsdlId,"--------",wsdlId);
    if(apiService.groupId===undefined || ( apiWsdlId !== wsdlId && wsdlId ) ){
      dispatch({
        type: 'apiCreateWsdlModel/initDataForAdd',
        payload
      });
    }
    if( !wsdlId ){
      router.push('/apiGateway/wsdlList');
    }

  }

  render() {
    const { form, dispatch, apiCreateWsdlModel } = this.props;
    const {apiService,wsdlId,record} = apiCreateWsdlModel;
    const { getFieldDecorator, validateFields } = form;
    const userId = getUserId();
    apiService.createUser = getUserName();
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'apiCreateWsdlModel/saveStepFormData',
            payload: {...values},
            stepType:1,
          });
          router.push('/apiGateway/wsdl/consumer');
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="分组">
            {getFieldDecorator('groupId', {
              initialValue: apiService.groupId,
              rules: [{ required: true, message: '请选择分组' }],
            })(<GroupSelectView showSearch optionFilterProp="children" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Api Range">
            {getFieldDecorator('apiType', {
              initialValue: apiService.apiType,
              rules: [{ required: true, message: 'Please Select Api Range' }],
            })(<RadioView javaCode="apiService" javaKey="api_type" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务类型">
            Web Service
            {getFieldDecorator('serviceType', {
              initialValue: apiService.serviceType,
              rules: [{ required: true, message: '请选择服务类型' }],
            })(<RadioView javaCode="apiService" javaKey="service_type" onChange={this.handleChange} style={{display:'none'}} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求PATH">
            {record.wsdlUrlPath}
            {getFieldDecorator('requestUrl', {
              initialValue: record.wsdlUrlPath,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input placeholder="请输入请求PATH" hidden />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求类型">
            {getFieldDecorator('reqMethod', {
              initialValue: apiService.reqMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_method" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="WSDL">
            {getFieldDecorator('wsdlId', {
              initialValue: wsdlId,
              rules: [{ required: true, message: 'please select' }],
            })(<WsdlSelectView userId={userId} isDisable={1} />)}
          </Form.Item>
          <Form.Item
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
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>配置说明</h4>
          <p>第一步配置基础信息，第二步配置请求信息，第三步配置后端服务信息。</p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
