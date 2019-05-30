import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { getPayload } from './util';
import SelectView from '../SelectView';
import RadioView from '../RadioView';
import OrgSelectView from '../OrgSelectView';
import { getUserId } from '@/utils/authority';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ apiCreateModel, loading }) => ({
  submitting: loading.effects['apiCreateModel/submitStepForm'],
  apiService: apiCreateModel.apiService,
}))
@Form.create()
class Step3 extends React.PureComponent {
  render() {
    const { form, apiService, dispatch, submitting } = this.props;
    // console.log("apiService.apiServiceBackends:",apiService.apiServiceBackends);
    const data =
      apiService.apiServiceBackends && apiService.apiServiceBackends.length > 0
        ? apiService.apiServiceBackends[0]
        : {};
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/consumer');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        const apiServiceBackend = { ...data, ...values };
        const apiServiceBackends = [apiServiceBackend];
        apiService.apiServiceBackends = apiServiceBackends;
        const apiInfo = getPayload(1, apiService);
        // console.log(apiService);
        if (!err) {
          dispatch({
            type: 'apiCreateModel/submitStepForm',
            payload: apiInfo,
          });
        }
      });
    };
    const userId = getUserId(); // 获取当前登录用户编号
    // // console.log("step3 data:",data);
    // console.log('userId',getUserId());
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        {/* <Form.Item {...formItemLayout} className={styles.stepFormText} label="api名称："> */}
        {/* {apiService.name} */}
        {/* </Form.Item> */}
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="Api对外暴露的路径：">
          {apiService.requestUrl}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="服务提供者">
          {getFieldDecorator('orgId', {
            rules: [{ required: true, message: '请选择服务提供者' }],
          })(<OrgSelectView orgType="0,1" userId={userId} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务类型">
          {getFieldDecorator('serviceType', {
            initialValue: data.serviceType,
            rules: [{ required: true, message: '请选择提供方服务类型' }],
          })(<RadioView javaCode="apiService" javaKey="service_type" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务地址">
          {getFieldDecorator('url', {
            initialValue: data.url,
            rules: [{ required: true, message: '请输入提供方地址' }],
          })(<Input placeholder="http://ip:port" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务路径">
          {getFieldDecorator('reqPath', {
            initialValue: data.reqPath,
            rules: [],
          })(<Input placeholder="/xxx/xxx" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务请求类型">
          {getFieldDecorator('reqMethod', {
            initialValue: data.reqMethod,
            rules: [{ required: true, message: '请选择HTTP Method' }],
          })(<SelectView javaCode="common" javaKey="req_method" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务连接超时（ms）">
          {getFieldDecorator('connectTimeout', {
            initialValue: data.connectTimeout,
            rules: [{ required: true, message: '服务连接超时（ms）' }],
          })(<Input placeholder="请输入服务连接超时（ms）" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="服务请求超时（ms）">
          {getFieldDecorator('socketTimeout', {
            initialValue: data.socketTimeout,
            rules: [{ required: true, message: '服务请求超时（ms）' }],
          })(<Input placeholder="请输入服务请求超时（ms）" />)}
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
          <Button type="primary" onClick={onValidateForm} loading={submitting} htmlType="submit">
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }} htmlType="button">
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step3;
