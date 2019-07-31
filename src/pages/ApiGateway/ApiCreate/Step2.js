import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Upload, message, Icon, Form, Input, Button, Divider,Select } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';
import RadioView from '../RadioView';

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const selectBefore = (
  <Select defaultValue="/rest" style={{ width: 90 }}>
    <Option value="/rest">/rest</Option>
    <Option value="/ws">/ws</Option>
  </Select>
);

@connect(({ apiCreateModel }) => ({
  data: apiCreateModel.apiService,
}))
@Form.create()
class Step2 extends React.PureComponent {

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/info');
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'apiCreateModel/saveStepFormData',
            payload: {...values},
            stepType:1,
          });
          router.push('/apiGateway/apiCreate/producer');
        }
      });
    };
    // // console.log("step2 data:",data);

    const props = {
      name: 'files',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      action: '/server/baseInfo/file/uploadFiles',
      headers: {
        // authorization: 'authorization-text',
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTU2MDMwNzQwOCwiZXhwIjoyNTA2Mzg3NDA4fQ.hgDNGH-0HWtD9vd1QAJC0yIbzXqldv6HyyO5q70q0kC09ypGSuPo-usnWl2WSWpwTBy1aq1VqfO87RDwv8IF-A',
      },
      data:{folder:"40e1e280-433a-4fae-bd92-dade83788698-20190726154914"},
      accept: ".xsd,.wsdl",
      onChange(info) {
        console.log("upload....:",info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

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
                initialValue: '1',
                rules: [{ required: true, message: '请选择服务类型' }],
              })(<RadioView javaCode="apiService" javaKey="service_type" />)}
            </Form.Item>
          </span>
          <Form.Item {...formItemLayout} label="请求PATH">
            {getFieldDecorator('requestUrl', {
              initialValue: data.requestUrl,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input addonBefore={selectBefore} placeholder="请输入请求PATH" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求类型">
            {getFieldDecorator('reqMethod', {
              initialValue: data.reqMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_method" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="WSDL">
            {getFieldDecorator('wsdlId', {
              rules: [],
            })(
              <Select style={{ maxWidth: 220 }}>
                <Option value="1">wsdl1</Option>
                <Option value="2">wsdl2</Option>
              </Select>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Action Name">
            {getFieldDecorator('actionName', {
              initialValue: data.actionName,
              rules: [{ required: true, message: '请选择Action Name' }],
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
