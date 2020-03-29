import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="付款账户"
          name="payAccount"
          rules={[{ required: true, message: '请选择付款账户' }]}
        >
          <Select placeholder="test@example.com">
            <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
          </Select>
        </Form.Item>
        <Form.Item label="收款账户">
          <Input.Group compact>
            <Select defaultValue="alipay" style={{ width: 100 }}>
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行账户</Option>
            </Select>
            <Form.Item
              noStyle
              name="receiverAccount"
              rules={[
                { required: true, message: '请输入收款人账户' },
                { type: 'email', message: '账户名应为邮箱格式' },
              ]}
            >
              <Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="收款人姓名"
          name="receiverName"
          rules={[{ required: true, message: '请输入收款人姓名' }]}
        >
          <Input placeholder="请输入收款人姓名" />
        </Form.Item>
        <Form.Item
          label="转账金额"
          name="amount"
          rules={[
            { required: true, message: '请输入转账金额' },
            {
              pattern: /^(\d+)((?:\.\d+)?)$/,
              message: '请输入合法金额数字',
            },
          ]}
        >
          <Input prefix="￥" placeholder="请输入金额" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
        <h4>转账到银行卡</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step1);
