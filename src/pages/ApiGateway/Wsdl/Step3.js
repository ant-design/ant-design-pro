import React from 'react';
import { connect } from 'dva';
import { Form, Button, message } from 'antd';
import router from 'umi/router';
import ApiWsdlTableForm from './ApiWsdlTableForm';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ apiCreateWsdlModel, wsdlModel, loading }) => ({
  submitting: loading.effects['apiCreateWsdlModel/submitStepForm'],
  apiCreateWsdlModel,
  wsdlModel
}))
@Form.create()
class Step3 extends React.PureComponent {
  render() {
    const { form, apiCreateWsdlModel, dispatch, submitting } = this.props;
    const { apiService,wsdlId } = apiCreateWsdlModel;
    // console.log("apiService.apiServiceBackends:",apiService.apiServiceBackends);
    const data =
      apiService.apiServiceBackends && apiService.apiServiceBackends.length > 0
        ? apiService.apiServiceBackends
        : [];
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/wsdl/consumer');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {

        const {actions} = values;
        const apiServiceBackends = actions.map((item,index) => ({
          ...data[index],
          ...item
        }));
        apiService.apiServiceBackends = apiServiceBackends;
        apiCreateWsdlModel.apiService = apiService;
        const payload = {};
        payload.data = {};
        payload.data.info ={...apiCreateWsdlModel};
        if (!err) {

          dispatch({
            type: 'wsdlModel/saveBatchApi',
            payload,
            callback: resp => {

              if (resp.code === '200') {
                router.push({
                  pathname:'/apiGateway/wsdl/result',
                  state :{
                    wsdlId
                  }
                });
              } else {
                const msg = resp.msg || 'Server Internal Error.';
                message.error(msg);
              }

            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal">
        <Form.Item label="Action列表">
          {getFieldDecorator('actions', {
            initialValue: data,
          })(<ApiWsdlTableForm />)}
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
