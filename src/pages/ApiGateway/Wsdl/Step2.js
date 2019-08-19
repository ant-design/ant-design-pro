import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Divider} from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';
import RadioView from '../RadioView';
import OrgSelectView from '../OrgSelectView';
import {getUserId} from '@/utils/authority';

const userId = getUserId(); // 获取当前登录用户编号

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({apiCreateWsdlModel, wsdlModel}) => ({
  apiCreateWsdlModel,
  wsdlModel,
}))
@Form.create()
class Step2 extends React.PureComponent {

  getActionList = () => {

    const {form, apiCreateWsdlModel} = this.props;
    const {apiService, actionNames} = apiCreateWsdlModel;
    const {getFieldDecorator,} = form;


    return actionNames.map((item, index) => (
      <div>
        <Divider style={{margin: '24px 0'}} />
        <Form.Item {...formItemLayout} label="Action Name">
          {getFieldDecorator(`actionName${index}`, {
            initialValue: item,
            rules: [{required: true, message: 'please enter'}],
          })(<Input placeholder="please enter Action Name" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Action Name">
          {getFieldDecorator('serviceType', {
            initialValue: apiService.serviceType,
            rules: [{required: true, message: 'please choose服务类型'}],
          })(<RadioView javaCode="apiService" javaKey="service_type" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务连接超时（ms）">
          {getFieldDecorator('connectTimeout', {
            initialValue: apiService.connectTimeout,
            rules: [
              {required: true, message: '服务连接超时（ms）'},
              {
                pattern: /^[0-9]*[1-9][0-9]*$/,
                message: 'Malformed number',
              },
            ],
          })(<Input placeholder="please enter服务连接超时（ms）" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务请求超时（ms）">
          {getFieldDecorator('socketTimeout', {
            initialValue: apiService.socketTimeout,
            rules: [{required: true, message: '服务请求超时（ms）'}],
          })(<Input placeholder="please enter服务请求超时（ms）" />)}
        </Form.Item>
      </div>
    ));

  }

  render() {
    const {form, dispatch, apiCreateWsdlModel} = this.props;
    const {apiService,record,actionNames} = apiCreateWsdlModel;
    const {validateFields, getFieldDecorator} = form;
    const data =
      apiService.apiServiceBackends && apiService.apiServiceBackends.length > 0
        ? apiService.apiServiceBackends[0]
        : {};
    const onPrev = () => {
      router.push('/apiGateway/wsdl/info');
    };
    const onValidateForm = () => {
      validateFields((err, values) => {

        // 组装数据
        const apiServiceBackends = actionNames.map((item) => ({
          ...data,
          actionName:item,
          ...values,
          key:item
        }));
        console.log("step2",apiServiceBackends);
        apiService.apiServiceBackends = apiServiceBackends;

        if (!err) {
          console.log("values:", values);
          dispatch({
            type: 'apiCreateWsdlModel/saveStepFormData',
            payload: {...values},
            stepType: 1,
          });
          router.push('/apiGateway/wsdl/producer');
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Api对外暴露的路径：">
            {apiService.requestUrl}
          </Form.Item>
          <Divider style={{ margin: '24px 0' }} />
          <Form.Item {...formItemLayout} label="服务提供者">
            {getFieldDecorator('orgId', {
              rules: [{ required: true, message: 'please choose服务提供者' }],
            })(<OrgSelectView orgType="0,1" userId={userId} value={data.orgId} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务类型">
            {getFieldDecorator('serviceType', {
              initialValue: data.serviceType,
              rules: [{ required: true, message: 'please choose提供方服务类型' }],
            })(<RadioView javaCode="apiServiceBackend" javaKey="service_type" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务地址">
            {getFieldDecorator('url', {
              initialValue: data.url,
              rules: [{ required: true, message: 'please enter提供方地址' }],
            })(<Input placeholder="http://ip:port" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务路径">
            {getFieldDecorator('reqPath', {
              initialValue: record.wsdlUrlPath,
              rules: [],
            })(<Input placeholder="Only For Rest:/xxx/xxx" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务请求类型">
            {getFieldDecorator('reqMethod', {
              initialValue: data.reqMethod,
              rules: [{ required: true, message: 'please chooseHTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_method" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务连接超时（ms）">
            {getFieldDecorator('connectTimeout', {
              initialValue: data.connectTimeout,
              rules: [
                { required: true, message: '服务连接超时（ms）' },
                {
                  pattern: /^[0-9]*[1-9][0-9]*$/,
                  message: 'Malformed number',
                },
              ],
            })(<Input placeholder="please enter服务连接超时（ms）" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="服务请求超时（ms）">
            {getFieldDecorator('socketTimeout', {
              initialValue: data.socketTimeout,
              rules: [{ required: true, message: '服务请求超时（ms）' }],
            })(<Input placeholder="please enter服务请求超时（ms）" />)}
          </Form.Item>
          <Form.Item
            style={{marginBottom: 8}}
            wrapperCol={{
              xs: {span: 24, offset: 0},
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
            <Button onClick={onPrev} style={{marginLeft: 8}} htmlType="button">
              上一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{margin: '40px 0 24px'}} />
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
